import * as core from '@serverless-devs/core';
import oss, { IOssConfig } from './oss.service';
const OSS = require('ali-oss')
import fse from "fs";
import Client from './client';
import { InputProps, OutputProps } from './entity';
import { vpcAvailable } from './client';
import { cpuLimit, memoryLimit } from '../lib/help/constant';
import Table from 'tty-table';

const inquirer = core.inquirer;


async function uploadFile(credentials: any, codePackage: { bucket: { name: any; region: any; }; path: any; }, object: string, type: string) {
    const ossConfig: IOssConfig = {
        accessKeyId: credentials?.AccessKeyID,
        accessKeySecret: credentials?.AccessKeySecret,
        securityToken: credentials?.SecurityToken,
        bucket: codePackage.bucket.name,
        region: codePackage.bucket.region,
        file: codePackage.path,
        object: object,
        type: type,
    };
    await oss(ossConfig);
}

/**
 * 判断是否需要重新绑定slb
 * @param slb 本地slb
 * @param appId appid
 */
export async function needBindSlb(slb: any, appId: string) {
    const data = await Client.saeClient.getSLB(appId);
    const remoteIntranet = data['Data']['Intranet'];
    const remoteInternet = data['Data']['Internet'];
    const localInternet = slb.Internet ? slb.Internet : [];
    const localIntranet = slb.Intranet ? slb.Intranet : [];
    if (remoteIntranet.length === 0 && remoteInternet.length === 0) {
        return true;
    }
    if ((remoteInternet.length === 0 && localInternet.length > 0) || (remoteInternet.length > 0 && localInternet.length === 0)) {
        return true;
    }
    if ((remoteIntranet.length === 0 && localIntranet.length > 0) || (remoteIntranet.length > 0 && localIntranet.length === 0)) {
        return true;
    }
    if (localIntranet.length > 0 && remoteIntranet[0]['TargetPort'] !== localIntranet[0]['targetPort']) {
        return true;
    }
    if (localInternet.length > 0 && remoteInternet[0]['TargetPort'] !== localInternet[0]['targetPort']) {
        return true;
    }
    return false;
}

export async function deleteFile(credentials: any, bucket: any, fileName: string) {
    const client = new OSS({
        region: `oss-${bucket.region}`,
        accessKeyId: credentials?.AccessKeyID,
        accessKeySecret: credentials?.AccessKeySecret,
        securityToken: credentials?.SecurityToken,
        bucket: bucket.name,
    });
    try {
        await client.delete(fileName);
    } catch (e) {
        console.log(e);
    }
}

export async function file2delete(region: any, application: any, credentials: any) {
    let codePackage = application?.code?.package;
    if (!codePackage) {
        return {};
    }
    const { AccountID } = credentials;
    codePackage = await getPackageStruct(codePackage, region, AccountID);
    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
        return {};
    }
    const fileName = "sae-" + application.name + "-" + codePackage.path;
    const bucket = codePackage.bucket;
    const fileAddr = `https://${codePackage.bucket.name}.oss-${codePackage.bucket.region}.aliyuncs.com/${fileName}`;
    return { fileName, bucket, fileAddr };
}

export async function checkStatus(appId, coType) {
    let status = true
    while (status) {
        try {
            const tempResult = await Client.saeClient.listChangeOrders(appId, coType);
            const tempStatus = tempResult['Data']['ChangeOrderList'][0].Status;
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

export async function getStatusByOrderId(orderId: any) {
    let status = true
    while (status) {
        try {
            const tempResult = await Client.saeClient.describeChangeOrder(orderId);
            const tempStatus = tempResult['Data'].Status;
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

export async function infoRes(application: any) {
    const appId = application.AppId;
    const slbConfig = await Client.saeClient.getSLB(appId);
    const data = await Client.saeClient.describeApplicationConfig(appId);
    const appConfig = data['Data'];
    const result: OutputProps = {
        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${appId}&regionId=${application.RegionId}&namespaceId=${application.NamespaceId}`,
        namespace: {
            id: appConfig.NamespaceId,
        },
        vpcConfig: {
            vpcId: appConfig.VpcId,
            vSwitchId: appConfig.VSwitchId,
            securityGroupId: appConfig.SecurityGroupId,
        },
        application: {
            name: application.AppName,
            packageType: application.PackageType,
            imageUrl: application.ImageUrl,
            packageUrl: application.PackageUrl,
            cpu: application.Cpu,
            memory: application.Memory,
            replicas: application.Replicas,
            scaleRuleEnabled: application.ScaleRuleEnabled,
            instances: application.Instances,
            appDescription: application.AppDescription,
            runningInstances: application.RunningInstances,
            appDeletingStatus: application.AppDeletingStatus,
        },
        slb: {
        }
    };
    if (slbConfig['Data']['InternetIp']) {
        result.slb.InternetIp = slbConfig['Data']['InternetIp'] + ':' + String(slbConfig['Data']['Internet'][0]['Port']);
    }
    if (slbConfig['Data']['IntranetIp']) {
        result.slb.IntranetIp = slbConfig['Data']['IntranetIp'] + ':' + String(slbConfig['Data']['Intranet'][0]['Port']);
    }
    return result;
}

export async function output(applicationObject: any, slbConfig: any) {
    const result: OutputProps = {
        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${applicationObject.AppId}&regionId=${applicationObject.region}&namespaceId=${applicationObject.NamespaceId}`,
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
            packageType: applicationObject.PackageType,
        },
        slb: {
        }
    };
    if (applicationObject.ImageUrl) {
        result.application.imageUrl = applicationObject.ImageUrl;
    }
    if (applicationObject.PackageUrl) {
        result.application.packageUrl = applicationObject.PackageUrl;
    }
    result.application.cpu = applicationObject.Cpu;
    result.application.memory = applicationObject.Memory;
    result.application.replicas = applicationObject.Replicas;

    if (slbConfig['Data']['InternetIp']) {
        result.slb.InternetIp = slbConfig['Data']['InternetIp'];
        result.slb.InternetPort = slbConfig['Data']['Internet'][0]['Port'];
        result.accessLink = result.slb.InternetIp + ':' + String(result.slb.InternetPort);
    }
    if (slbConfig['Data']['IntranetIp']) {
        result.slb.IntranetIp = slbConfig['Data']['IntranetIp'];
        result.slb.IntranetPort = slbConfig['Data']['Intranet'][0]['Port'];
        result.accessLink = result.slb.IntranetIp + ':' + String(result.slb.IntranetPort);
    }
    return result;
}

export async function handleEnv(inputs: InputProps, application: any, credentials: any) {
    let { props: { region, namespace, vpcConfig, slb } } = inputs;
    let autoConfig = false;
    if (vpcConfig) {
        const vpcAvail = await vpcAvailable(vpcConfig.vpcId, region, credentials);
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
        vpcConfig = {
            vpcId: defaultNamespace.VpcId,
            vSwitchId: defaultNamespace.VSwitchId,
            securityGroupId: defaultNamespace.SecurityGroupId,
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
    application.AppName = application.name;
    application.AppDescription = application.decription;
    application.NamespaceId = namespace.id;
    application.NamespaceName = namespace.name;
    application.VpcId = vpcConfig.vpcId;
    application.VSwitchId = vpcConfig.vSwitchId;
    application.SecurityGroupId = vpcConfig.securityGroupId;
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
            //文件命名规范：1.使用 UTF-8 编码 2.区分大小写 3.长度必须在 1~1023 字节之间 4. 不能以 / 或者 \ 字符开头
            let tempObject = "sae-" + application.name + "-" + codePackage.path;
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
    // 检查参数合法性
    /**
     * CPU，单位为毫核，不能为0。目前仅支持以下固定规格：500、1000、2000、4000、8000、16000、32000
     * 内存，单位为MB，不能为0。与CPU为一一对应关系，目前仅支持以下固定规格：
            1024：对应CPU为500毫核和1000毫核。
            2048：对应CPU为500、1000毫核和2000毫核。
            4096：对应CPU为1000、2000毫核和4000毫核。
            8192：对应CPU为2000、4000毫核和8000毫核。
            12288：对应CPU为12000毫核。
            16384：对应CPU为4000、8000毫核和16000毫核。
            24576：对应CPU为12000毫核。
            32768：对应CPU为16000毫核。
            65536：对应CPU为8000、16000和32000毫核。
            131072：对应CPU为32000毫核。
        初始实例数：整数
     */
    if (applicationObject.cpu) {
        if (cpuLimit.indexOf(applicationObject.cpu) === -1) {
            throw new core.CatchableError('cpu仅支持以下固定规格：500、1000、2000、4000、8000、16000、32000');
        }
        applicationObject.Cpu = applicationObject.cpu;
    } else {
        applicationObject.Cpu = 500;
    }
    if (applicationObject.memory) {
        const arr = memoryLimit.get(applicationObject.Cpu);
        if (arr.indexOf(applicationObject.memory) === -1) {
            throw new core.CatchableError(`cpu取值为${applicationObject.Cpu}时，memory仅支持以下固定规格：${arr}`);
        }
        applicationObject.Memory = applicationObject.memory;
    } else {
        applicationObject.Memory = memoryLimit.get(applicationObject.Cpu)[0];
    }
    if (applicationObject.replicas) {
        if (Number.isInteger(applicationObject.replicas) && applicationObject.replicas > 0) {
            applicationObject.Replicas = applicationObject.replicas;
        } else {
            throw new core.CatchableError('replicas的值需要是正整数');
        }
    } else {
        applicationObject.Replicas = 1;
    }
    // 参数命名方式修改
    for (var key in applicationObject) {
        if (/^[a-z].*$/.test(key)) {
            let Key = key.replace(key[0], key[0].toUpperCase());
            applicationObject[Key] = applicationObject[key];
        }
    }
}


export async function parseCommand(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (!data) {
        return {};
    }
    const isHelp = data.h || data.help;
    const useLocal = data['use-local'];
    const useRemote = data['use-remote'];
    return { isHelp, useLocal, useRemote };
}

export async function handlerInfoInputs(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (!data) {
        return {};
    }
    const isHelp = data.h || data.help;
    const outputFile = data['output'];
    return { isHelp, outputFile };
}

export async function handlerRmInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (!data) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    return { isHelp, assumeYes };
}

export async function promptForConfirmOrDetails(message: string): Promise<boolean> {
    const answers: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message,
            choices: ['yes', 'no'],
        },
    ]);

    return answers.prompt === 'yes';
}

// 没有子资源：能够被删除，不作处理。 返回undefined
// 存在子资源选择 no：一定不能被删除，需要退出程序。 返回quit
// 存在子资源选择 yes：需要强制删除所有资源，需要向下传递 assumeYes。  返回assumeYes
export async function removePlan(application, file) {
    console.log(`Need to delete the resource in the ${application.RegionId} area:`);
    let header = [{
        value: "appName",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "description",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "runningInstances",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    }
    ];
    let data = [{
        appName: application.AppName,
        description: application.AppDescription,
        runningInstances: application.RunningInstances
    }
    ]
    console.log('\r\napplication:');
    console.log(Table(header, data).render());
    const slb = await Client.saeClient.getSLB(application.AppId);
    let header2 = [{
        value: "InternetIp",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "IntranetIp",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    }
    ];
    let data2 = [{
        InternetIp: slb['Data']['InternetIp']?slb['Data']['InternetIp']:'',
        IntranetIp: slb['Data']['IntranetIp']?slb['Data']['IntranetIp']:''
    }
    ]
    console.log('\r\nslb:');
    console.log(Table(header2, data2).render());
    if (file?.fileName) {
        let header3 = [{
            value: "fileName",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 40
        },
        {
            value: "bucketName",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 40
        },
        {
            value: "fileAddr",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 40
        }
        ];
        let data3 = [{
            fileName: file.fileName,
            bucketName: file.bucket.name,
            fileAddr: file.fileAddr,
        }
        ]
        console.log('\r\noss:');
        console.log(Table(header3, data3).render());
    }
    const assumeYes = await promptForConfirmOrDetails(
        'Are you sure you want to delete these resources?',
    );
    return assumeYes ? 'assumeYes' : 'quit';
}