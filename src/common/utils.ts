import * as core from '@serverless-devs/core';
import oss, { IOssConfig } from './oss.service';
import fse from "fs";
import Client from './client';
import { InputProps, OutputProps } from './entity';
import { vpcAvailable } from './client';

export async function uploadFile(credentials: { AccessKeyID: any; AccessKeySecret: any; }, codePackage: { bucket: { name: any; region: any; }; path: any; }, object: string, type: string) {
    const ossConfig: IOssConfig = {
        accessKeyId: credentials.AccessKeyID,
        accessKeySecret: credentials.AccessKeySecret,
        bucket: codePackage.bucket.name,
        region: codePackage.bucket.region,
        file: codePackage.path,
        object: object,
        type: type,
    };
    await oss(ossConfig);
}

export async function checkStatus(appId, coType) {
    let status = true
    while (status) {
        try {
            const tempResult = await Client.saeClient.listChangeOrders(appId, coType);
            const tempStatus = tempResult['Data']['ChangeOrderList'][0].Status
            if (tempStatus === 2) {
                status = false
            } else if (tempStatus === 0) {
                status = true
            } else if (tempStatus === 1) {
                status = true
            } else if (tempStatus === 3) {
                throw new core.CatchableError('应用状态为：执行失败')
            } else if (tempStatus === 6) {
                throw new core.CatchableError('应用状态为：终止')
            } else if (tempStatus === 10) {
                throw new core.CatchableError('应用状态为：系统异常执行失败')
            }
        } catch (e) {
            throw e
        }
        // 等待1s
        await new Promise(f => setTimeout(f, 1000));
    }
}

export async function output(applicationObject: any, slbConfig: any){
    const result: OutputProps = {
        namespace: {
            id: applicationObject.NamespaceId,
            name: applicationObject.NamespaceName,
        },
        vpcConfig: {
            vpcId: applicationObject.VpcId,
            vSwitchId: applicationObject.VSwitchId,
            securityGroupId: applicationObject.SecurityGroupId,
          },
          application: {
            id: applicationObject.AppId,
            name: applicationObject.name,
            console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${applicationObject.NamespaceId}&regionId=${applicationObject.region}&namespaceId=${applicationObject.NamespaceId}`,
            packageType: applicationObject.PackageType,
            cpu: applicationObject.Cpu,
            memory: applicationObject.Memory,
            replicas: applicationObject.Replicas,
          },
          slb: {
          }
      };
      if(applicationObject.ImageUrl){
        result.application.imageUrl = applicationObject.ImageUrl;
      }
      if(applicationObject.PackageUrl){
        result.application.packageUrl = applicationObject.PackageUrl;
      }
      if(slbConfig["Data"]['InternetIp']){
        result.slb.InternetIp = slbConfig["Data"]['InternetIp'];
      }
      if(slbConfig["Data"]['IntranetSlbId']){
        result.slb.IntranetSlbId = slbConfig["Data"]['IntranetSlbId'];
      }
      return result;
}

export async function handleEnv(inputs: InputProps, application: any, credentials: any) {
    let { props: { region, namespace, vpcConfig, slb } } = inputs;
    let autoConfig = false;
    if (vpcConfig) {
        const vpcAvail = await vpcAvailable(vpcConfig.vpcId, region, credentials.AccessKeyID, credentials.AccessKeySecret);
        if (!vpcAvail) {
            throw new core.CatchableError('vpc配置不可用');
        }
    }
    if (!namespace && !vpcConfig) {
        // 自动配置
        autoConfig = true;
        const defaultNamespace = await Client.saeClient.getNamespace();
        namespace = {
            id: defaultNamespace.NamespaceId,
            name: defaultNamespace.NamespaceName,
        }
    } else if (!namespace && vpcConfig) {
        // 使用默认命名空间
        const defaultNamespace = await Client.saeClient.getNamespace();
        namespace = {
            id: defaultNamespace.NamespaceId,
            name: defaultNamespace.NamespaceName,
        }
        await Client.saeClient.updateNamespaceVpc(namespace.id, vpcConfig.vpcId);
    } else if (namespace && !vpcConfig) {
        throw new core.CatchableError("The specified parameter 'vpcConfig' is invalid.")
    } else {
        try {
            await Client.saeClient.createNamespace(namespace);
        } catch (e) {
            if (e.message.includes('The specified namespace ID already exists')) {
                // The specified namespace ID already exists
                await Client.saeClient.updateNamespace(namespace);
            } else {
                throw e
            }
        }
    }
    application.AutoConfig = autoConfig;
    if (!application.AutoConfig) {
        if (namespace.id) {
            application.NamespaceId = namespace.id;
        }
        if (vpcConfig) {
            application.VpcId = vpcConfig.vpcId;
            application.VSwitchId = vpcConfig.vSwitchId;
            application.SecurityGroupId = vpcConfig.securityGroupId;
        }
    }
    application.AppName = application.name;
    application.AppDescription = application.decription;
    application.NamespaceName = namespace.name;
    application.region = region;

    // slb
    if (application.port) {
        slb = {
            Internet: [{ "port": 80, "targetPort": application.port, "protocol": "HTTP" }]
        };
    }
    return { namespace, slb };
}

async function getPackageStruct(codePackage: any, region: any, AccountID: any) {
    if (typeof codePackage == 'string') {
        codePackage = {
            path: codePackage,
            bucket: {
                region: region,
                name: `sae-packages-${region}-${AccountID}`
            }
        }
    } else {
        if (!codePackage.path) {
            throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确")
        }
        const codeBucket = codePackage.bucket || {}
        codeBucket.region = codeBucket.region || region
        codeBucket.name = codeBucket.name || `sae-packages-${region}-${AccountID}`
        codePackage.bucket = codeBucket
    }
    return codePackage;
}

export async function handleCode(region: any, application: any, credentials: any) {
    let { AccountID } = credentials;

    const applicationObject = JSON.parse(JSON.stringify(application));
    delete applicationObject.code;

    // 对code进行处理
    if (!application.code) {
        throw new core.CatchableError("未指定部署的代码");
    }
    const code = application.code;
    const image = code.image;
    let codePackage = code.package;
    if (image) {
        if (code.type === 'php') {
            applicationObject.PackageType = 'IMAGE_PHP_7_3';
        } else {
            applicationObject.PackageType = 'Image';
        }
        applicationObject.ImageUrl = image;
    } else if (codePackage) {
        codePackage = await getPackageStruct(codePackage, region, AccountID);
        if (codePackage.path.endsWith('.war') || codePackage.path.endsWith('.jar') || codePackage.path.endsWith('.zip')) {
            let tempObject = "sae-"+application.name+"-"+codePackage.path;
            if (codePackage.path.endsWith('.war')) {
                applicationObject.PackageType = 'War';
                applicationObject.WebContainer = 'apache-tomcat-8.5.42';
                applicationObject.Jdk = 'Open JDK 8';
                // applicationObject.PackageVersion = '1.0.0';
            } else if (codePackage.path.endsWith('.jar')) {
                applicationObject.PackageType = 'FatJar';
                applicationObject.Jdk = 'Open JDK 8';
                // applicationObject.PackageVersion = '1.0.0';
            } else if (codePackage.path.endsWith('.zip')) {
                applicationObject.PackageType = 'PhpZip';
                applicationObject.PhpArmsConfigLocation = '/usr/local/etc/php/conf.d/arms.ini';
                applicationObject.Php = 'PHP-FPM 7.3';
            }
            if (await fse.existsSync(codePackage.path)) {
                await uploadFile(credentials, codePackage, tempObject, 'upload')
                applicationObject.PackageUrl = `https://${codePackage.bucket.name}.oss-${codePackage.bucket.region}.aliyuncs.com/${tempObject}`;
            } else if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                applicationObject.PackageUrl = codePackage.path;
            } else {
                throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
            }
        } else {
            throw new core.CatchableError("未能找到代码文件，请确定参数传递正确");
        }
    } else {
        throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
    }
    return applicationObject;
}

export async function setDefault(applicationObject: any) {
    applicationObject.Cpu = applicationObject.cpu ? applicationObject.cpu : 500;
    applicationObject.Memory = applicationObject.memory ? applicationObject.memory : 1024;
    applicationObject.Replicas = applicationObject.Replicas ? applicationObject.replicas : 1;
    // 参数命名方式修改
    for (var key in applicationObject) {
        if (/^[a-z].*$/.test(key)) {
            let Key = key.replace(key[0], key[0].toUpperCase());
            applicationObject[Key] = applicationObject[key];
        }
    }
}