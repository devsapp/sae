import * as core from '@serverless-devs/core';
import oss, { IOssConfig } from './oss.service';
import fse from "fs";
import stringRandom from 'string-random';
import Client from './client';
import { InputProps } from './entity';
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

    // slb
    if (application.port) {
        slb = {
            Internet: [{ "port": 80, "targetPort": application.port, "protocol": "HTTP" }]
        };
    }
    return { namespace, slb };
}

export async function handleCode(region: any, application: any, credentials: any) {
    let { AccountID } = credentials;

    let tempObject = stringRandom(16);
    const applictionObject = JSON.parse(JSON.stringify(application));
    delete applictionObject.code;

    // 对code进行处理
    if (!application.code) {
        throw new core.CatchableError("未指定部署的代码");
    }
    const code = application.code;
    const image = code.image;
    let codePackage = code.package;
    if (image) {
        applictionObject.PackageType = 'Image';
        applictionObject.ImageUrl = image;
    } else if (codePackage) {
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
        if (codePackage.path.endsWith('.war') || codePackage.path.endsWith('.jar')) {
            if (codePackage.path.endsWith('.war')) {
                tempObject = tempObject + '.war';
                applictionObject.PackageType = 'War';
                applictionObject.WebContainer = 'apache-tomcat-8.5.42';
            } else if (codePackage.path.endsWith('.jar')) {
                tempObject = tempObject + '.jar';
                applictionObject.PackageType = 'FatJar';
            }
            applictionObject.Jdk = 'Open JDK 8';
            applictionObject.PackageVersion = '	1.0.0';
            if (await fse.existsSync(codePackage.path)) {
                await uploadFile(credentials, codePackage, tempObject, 'upload')
                applictionObject.PackageUrl = `https://${codePackage.bucket.name}.oss-${codePackage.bucket.region}.aliyuncs.com/${tempObject}`;
            } else if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                applictionObject.PackageUrl = codePackage.path;
            } else {
                throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
            }
        } else {
            throw new core.CatchableError("未能找到war/jar文件，请确定参数传递正确");
        }
    } else {
        throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
    }
    return applictionObject;
}

export async function setDefault(applictionObject: any) {
    applictionObject.Cpu = applictionObject.cpu ? applictionObject.cpu : 500;
    applictionObject.Memory = applictionObject.memory ? applictionObject.memory : 1024;
    applictionObject.Replicas = applictionObject.Replicas ? applictionObject.replicas : 1;
    // 参数命名方式修改
    for(var key in applictionObject){
        if(/^[a-z].*$/.test(key)){
            let Key = key.replace(key[0],key[0].toUpperCase());
            applictionObject[Key] = applictionObject[key];
        }
    }
}