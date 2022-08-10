import * as core from '@serverless-devs/core';
import Oss from './oss.service';
import Client, { vpcAvailable } from './client';
import { OutputProps } from '../interface/entity';
import { cpuLimit, memoryLimit } from './help/constant';
import Table from 'tty-table';

const { inquirer, fse, lodash } = core;

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
    if (localIntranet.length > 0 && (remoteIntranet[0]['TargetPort'] !== localIntranet[0]['targetPort'] || remoteIntranet[0]['Port'] !== localIntranet[0]['port']) ) {
        return true;
    }
    if (localInternet.length > 0 && (remoteInternet[0]['TargetPort'] !== localInternet[0]['targetPort'] || remoteInternet[0]['Port'] !== localInternet[0]['port'])) {
        return true;
    }
    return false;
}

export async function file2delete(region: any, application: any, credentials: any) {
    const packageUrl = application.code.packageUrl;
    if (lodash.isEmpty(packageUrl)) {
        return {};
    }
    const { AccountID } = credentials;
    if (packageUrl.startsWith("http://") || packageUrl.startsWith("https://")) {
        return {};
    }
    const bucketName = await Oss.getBucketName(application.code.ossConfig, region, AccountID);
    let filename = application.appName;
    if (packageUrl.endsWith('.war')) {
        filename = filename + '.war';
    } else if (packageUrl.endsWith('.jar')) {
        filename = filename + '.jar';
    } else if (packageUrl.endsWith('.zip')) {
        filename = filename + '.zip';
    }
    const fileAddr = `https://${bucketName}.oss-${region}.aliyuncs.com/${filename}`;
    return { filename, bucketName, fileAddr };
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
    const data1 = await Client.saeClient.describeApplicationConfig(appId);
    const appConfig = data1['Data'];
    const data2 = await Client.saeClient.describeNamespace(appConfig.NamespaceId);
    const namespace = data2['Data'];
    const result: OutputProps = {
        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${appId}&regionId=${application.RegionId}&namespaceId=${application.NamespaceId}`,
        application: {
            region: application.RegionId,
            namespaceId: appConfig.NamespaceId,
            namespaceName: namespace.NamespaceName,
            vpcId: appConfig.VpcId,
            vSwitchId: appConfig.VSwitchId,
            securityGroupId: appConfig.SecurityGroupId,
            appId: application.AppId,
            appName: application.AppName,
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
    if (slbConfig['Data']) {
        result.slb = slbConfig['Data'];
    }
    return result;
}

export async function output(applicationObject: any, slbConfig: any) {
    const result: OutputProps = {

        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${applicationObject.AppId}&regionId=${applicationObject.Region}&namespaceId=${applicationObject.NamespaceId}`,
        application: {
            region: applicationObject.Region,
            namespaceId: applicationObject.NamespaceId,
            namespaceName: applicationObject.NamespaceName,
            vpcId: applicationObject.VpcId,
            vSwitchId: applicationObject.VSwitchId,
            securityGroupId: applicationObject.SecurityGroupId,
            appId: applicationObject.AppId,
            appName: applicationObject.AppName,
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
    result.slb = slbConfig['Data'];
    if (slbConfig['Data']['InternetIp']) {
        result.accessLink = result.slb.InternetIp + ':' + String(slbConfig['Data']['Internet'][0]['Port']);
    }
    if (slbConfig['Data']['IntranetIp']) {
        result.accessLink = result.slb.IntranetIp + ':' + String(slbConfig['Data']['Intranet'][0]['Port']);
    }
    return result;
}

export async function handleEnv(slb: any, application: any, credentials: any) {
    const { region, namespaceId, vpcId } = application;
    application.autoConfig = false;
    if (vpcId) {
        const vpcAvail = await vpcAvailable(vpcId, region, credentials);
        if (!vpcAvail) {
            throw new core.CatchableError('vpc配置不可用');
        }
    }
    if (lodash.isEmpty(namespaceId) && lodash.isEmpty(vpcId)) {
        // 自动配置
        application.autoConfig = true;
        const defaultNamespace = await Client.saeClient.getNamespace();
        application.namespaceId = defaultNamespace.NamespaceId;
        application.vpcId = defaultNamespace.VpcId;
        application.vSwitchId = defaultNamespace.VSwitchId;
        application.securityGroupId = defaultNamespace.SecurityGroupId;
    } else if (lodash.isEmpty(namespaceId) && vpcId) {
        // 使用默认命名空间
        const defaultNamespace = await Client.saeClient.getNamespace();
        application.namespaceId = defaultNamespace.NamespaceId;
        try{
            await Client.saeClient.updateNamespaceVpc(application.namespaceId, vpcId);
        }catch(e){
            if (e.message.includes('Please delete the application first')) {
                throw new core.CatchableError('默认命名空间正在运行的应用');
            }
        }
        
    } else if (namespaceId && lodash.isEmpty(vpcId)) {
        throw new core.CatchableError("The specified parameter 'vpcConfig' is invalid.")
    }

    // slb
    if (!application.port) {
        throw new core.CatchableError('port 为必填项.');
    }
    if (lodash.isEmpty(slb)) {
        throw new core.CatchableError('slb 为必填项.');
    }
    if (lodash.isEqual(slb, 'auto')) {
        slb = {
            Internet: [{ "port": 80, "targetPort": application.port, "protocol": "HTTP" }]
        };
    } else {
        // 使用用户配置的slb
    }
    return {slb};
}

export async function handleCode(application: any, credentials: any, configPath?: string) {
    const { AccountID } = credentials;
    const { region, code, appName } = application;
    const applicationObject = lodash.cloneDeep(application);
    delete applicationObject.code;

    // 对code进行处理
    if (lodash.isEmpty(code)) {
        throw new core.CatchableError("未指定部署的代码");
    }
    applicationObject.packageType = code.packageType;
    if (code.imageUrl) {
        applicationObject.imageUrl = code.imageUrl;
        // 使用用户设置的 packageType
    } else if (code.packageUrl) {
        const bucketName = await Oss.getBucketName(code.ossConfig, region, AccountID);
        if (code.packageUrl.endsWith('.war') || code.packageUrl.endsWith('.jar') || code.packageUrl.endsWith('.zip')) {
            //文件命名规范：1.使用 UTF-8 编码 2.区分大小写 3.长度必须在 1~1023 字节之间 4. 不能以 / 或者 \ 字符开头
            let filename = appName;
            if (code.packageUrl.endsWith('.war')) {
                filename = filename + '.war';
                applicationObject.WebContainer = 'apache-tomcat-8.5.42';
                applicationObject.Jdk = 'Open JDK 8';
                applicationObject.packageVersion = code.packageVersion;
            } else if (code.packageUrl.endsWith('.jar')) {
                filename = filename + '.jar';
                applicationObject.Jdk = 'Open JDK 8';
                applicationObject.packageVersion = code.packageVersion;
            } else if (code.packageUrl.endsWith('.zip')) {
                filename = filename + '.zip';
                applicationObject.PhpArmsConfigLocation = '/usr/local/etc/php/conf.d/arms.ini';
                applicationObject.Php = 'PHP-FPM 7.3';
            }
            if (await fse.existsSync(code.packageUrl)) {
                const ossClient = new Oss({ bucket: bucketName, region, credentials });
                await ossClient.upload(
                    { file: code.packageUrl, object: filename, type: 'upload' },
                    { configPath, appName },
                );
                applicationObject.PackageUrl = `https://${bucketName}.oss-${region}.aliyuncs.com/${filename}`;
            } else if (code.packageUrl.startsWith("http://") || code.packageUrl.startsWith("https://")) {
                applicationObject.PackageUrl = code.packageUrl;
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
        if (!applicationObject[key]) {
            delete (applicationObject[key]);
        } else if (/^[a-z].*$/.test(key)) {
            let Key = key.replace(key[0], key[0].toUpperCase());
            applicationObject[Key] = applicationObject[key];
            delete (applicationObject[key]);
        }
    }
}


export async function parseCommand(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const useLocal = data['use-local'];
    const useRemote = data['use-remote'];
    return { isHelp, useLocal, useRemote };
}

export async function handlerStartInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    return { isHelp, assumeYes };
}

export async function handlerStopInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    return { isHelp, assumeYes };
}

export async function handlerInfoInputs(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const outputFile = data['output'];
    return { isHelp, outputFile };
}

export async function handlerRmInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
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
        InternetIp: slb['Data']['InternetIp'] ? slb['Data']['InternetIp'] : '',
        IntranetIp: slb['Data']['IntranetIp'] ? slb['Data']['IntranetIp'] : ''
    }
    ]
    console.log('\r\nslb:');
    console.log(Table(header2, data2).render());
    if (file?.filename) {
        let header3 = [{
            value: "filename",
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
            filename: file.filename,
            bucketName: file.bucketName,
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

export async function stopPlan() {
    const assumeYes = await promptForConfirmOrDetails(
        '停止应用后，系统将物理删除该应用下所有的实例，业务会中断，资源计费也会停止。但会保存应用的基本配置信息，负载均衡设备信息，方便后续启动应用时秒级拉起应用。（停止再启动应用后实例ip会变）。请确认是否真的要停止应用？',
    );
    return assumeYes ? 'assumeYes' : 'quit';
}

export async function startPlan() {
    const assumeYes = await promptForConfirmOrDetails(
        '启动应用后，系统将根据停止应用前保存的快照配置信息，秒级恢复应用。恢复之后开始进行资源计费，请确认是否真的要启动应用？',
    );
    return assumeYes ? 'assumeYes' : 'quit';
}