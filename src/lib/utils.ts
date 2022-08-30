import * as core from '@serverless-devs/core';
import Oss from './oss.service';
import Client, { vpcAvailable } from './client';
import { OutputProps } from '../interface/entity';
import { isNumber, isString } from 'lodash';
import { getInquire } from './help/constant';
import { getDeployCache } from '../common/cache';
import { inquirer } from "@serverless-devs/core";

const { fse, lodash } = core;
const getFilename = (region, namespaceId, appName) => `${region}_${namespaceId}_${appName}`;

export const checkFileExists = (filePath) => {
    try {
        if (fse.statSync(filePath).isFile()) {
            return true;
        }
    } catch (ex) {
        // @ts-ignore: .
    }
    return false;
};

export async function getSyncConfig(inputs: any, appProps: any) {
    const projectName = inputs.project.projectName;
    let configs = {};
    configs['component'] = 'devsapp/sae';
    const { application, slb } = appProps;
    let code = {
        packageType: application.packageType,
    };
    if (!lodash.isEmpty(application.imageUrl)) {
        code['imageUrl'] = application.imageUrl;
    }
    if (!lodash.isEmpty(application.packageUrl)) {
        code['packageUrl'] = application.packageUrl;
        code['ossConfig'] = 'auto'
    }

    let tempApp = application;
    delete tempApp.packageType;
    delete tempApp.imageUrl;
    delete tempApp.packageUrl;
    delete tempApp.appId;
    delete tempApp.instances;
    delete tempApp.runningInstances;
    delete tempApp.minReadyInstanceRatio;
    delete tempApp.batchWaitTime;
    delete tempApp.namespaceName;
    delete tempApp.appDeletingStatus;
    delete tempApp.scaleRuleEnabled;

    let props = {
        application: {
            ...tempApp,
            port: slb.Internet[0].TargetPort,
        },
        slb: {}
    };
    props.application['code'] = code;

    // slb
    let tempSlb = {};

    const Internets = lodash.get(slb, 'Internet', []);
    for (const internet of Internets) {
        const { Port, TargetPort, Protocol } = internet;
        tempSlb['Internet'] = [
            { port: Port, targetPort: TargetPort, protocol: Protocol }
        ];
    }
    const Intranets = lodash.get(slb, 'Intranet', []);
    for (const internet of Intranets) {
        const { Port, TargetPort, Protocol } = internet;
        tempSlb['Intranet'] = [
            { port: Port, targetPort: TargetPort, protocol: Protocol }
        ];
    }

    if (!lodash.isEmpty(slb.InternetSlbId)) {
        tempSlb['InternetSlbId'] = slb.InternetSlbId;
    }
    if (!lodash.isEmpty(slb.IntranetSlbId)) {
        tempSlb['IntranetSlbId'] = slb.IntranetSlbId;
    }
    props.slb = tempSlb;

    configs['props'] = props;
    let result = {};
    result[`${projectName}`] = configs;
    return result;
}

/**
 * 判断是否需要重新绑定slb
 * @param slb 本地slb
 * @param appId appid
 */
export async function slbDiff(slb: any, appId: string) {
    const data = await Client.saeClient.getSLB(appId);
    const remoteIntranet = JSON.parse(JSON.stringify(data['Data']['Intranet']));
    const remoteInternet = JSON.parse(JSON.stringify(data['Data']['Internet']));
    for (var datum of remoteInternet) {
        for (var key in datum) {
            if (/^[A-Z].*$/.test(key)) {
                let Key = key.replace(key[0], key[0].toLowerCase());
                datum[Key] = datum[key];
                delete (datum[key]);
            }
        }
    }

    for (var datum of remoteIntranet) {
        for (var key in datum) {
            if (/^[A-Z].*$/.test(key)) {
                let Key = key.replace(key[0], key[0].toLowerCase());
                datum[Key] = datum[key];
                delete (datum[key]);
            }
        }
    }


    if (!slb.Internet) {
        slb['Internet'] = '[]'
    }
    if (!slb.Intranet) {
        slb['Intranet'] = '[]'
    }

    let localInternet = slb.Internet;
    if (isString(slb.Internet)) {
        localInternet = JSON.parse(slb.Internet);
    }
    let localIntranet = slb.Intranet;
    if (isString(slb.Intranet)) {
        localIntranet = JSON.parse(slb.Intranet);
    }
    if (lodash.isEqual(remoteIntranet, localIntranet) && lodash.isEqual(remoteInternet, localInternet)) {
        return false;
    }
    return true;
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
    //${regionid}_${namespace}_${appName}.zip
    let filename = getFilename(region, application.namespaceId, application.appName);
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

/**
 * 转换大小写，去除空值
 * @param appConfig 接口数据
 */
async function getConfig(data: any) {
    let appConfig = data['Data'];
    // 去掉create时不需要的
    appConfig['region'] = appConfig.RegionId;
    delete appConfig.MinReadyInstances;
    delete appConfig.MseApplicationId;
    delete appConfig.PhpExtensions;
    delete appConfig.PhpPECLExtensions;
    delete appConfig.RegionId;
    for (var key in appConfig) {
        if (!appConfig[key] ||
            (!isNumber(appConfig[key]) && (lodash.isEmpty(appConfig[key]))) ||
            (isString(appConfig[key]) && (appConfig[key] == 'null' || appConfig[key] == '[]'))) {
            delete (appConfig[key]);
        } else if (/^[A-Z].*$/.test(key)) {
            let Key = key.replace(key[0], key[0].toLowerCase());
            appConfig[Key] = appConfig[key];
            delete (appConfig[key]);
        }
    }
    return appConfig;
}

export async function infoRes(application: any) {
    const appId = application.AppId;
    const slbConfig = await Client.saeClient.getSLB(appId);
    const data1 = await Client.saeClient.describeApplicationConfig(appId);
    const appConfig = await getConfig(data1);
    const data2 = await Client.saeClient.describeNamespace(appConfig.namespaceId);
    const namespace = data2['Data'];
    const result: OutputProps = {
        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${appId}&regionId=${appConfig.region}&namespaceId=${appConfig.namespaceId}`,
        application: {
            ...appConfig,
            namespaceName: namespace.NamespaceName,
            scaleRuleEnabled: application.ScaleRuleEnabled,
            instances: application.Instances,
            runningInstances: application.RunningInstances,
            appDeletingStatus: application.AppDeletingStatus,
        },
        slb: {
        }
    };
    if (slbConfig['Data']) {
        result.slb = JSON.parse(JSON.stringify(slbConfig['Data']));
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
        try {
            await Client.saeClient.updateNamespaceVpc(application.namespaceId, vpcId);
        } catch (e) {
            if (e.message.includes('Please delete the application first')) {
                throw new core.CatchableError('默认命名空间正在运行的应用');
            }
        }

    } else if (namespaceId && lodash.isEmpty(vpcId)) {
        throw new core.CatchableError("The specified parameter 'vpcConfig' is invalid.")
    }

    // slb
    const localSlb = await formatSlb(slb, application.port);
    return { localSlb };
}

export async function handleCode(application: any, credentials: any, configPath?: string) {
    const { AccountID } = credentials;
    const { region, code, appName, namespaceId } = application;
    const applicationObject = lodash.cloneDeep(application);
    delete applicationObject.code;

    // 对code进行处理
    applicationObject.packageType = code.packageType;
    if (code.imageUrl) {
        applicationObject.imageUrl = code.imageUrl;
        // 使用用户设置的 packageType
    } else if (code.packageUrl) {
        const bucketName = await Oss.getBucketName(code.ossConfig, region, AccountID);
        if (code.packageUrl.endsWith('.war') || code.packageUrl.endsWith('.jar') || code.packageUrl.endsWith('.zip')) {
            //${regionid}_${namespace}_${appName}.zip
            let filename = getFilename(region, namespaceId, appName);
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

export async function getDiff(application: any, slb: any, remoteData: any, credentials: any, configPath: string) {
    const remoteResult = await infoRes(remoteData);
    let localApp = lodash.cloneDeep(application);
    const port = localApp.port;
    let code = localApp.code;
    delete localApp.port;
    delete localApp.code;

    const remoteApp = remoteResult.application;
    const remoteSlb = await slbLower(remoteResult.slb);
    let diffList = [];

    let change = {
        updateRemote: false,
        needRescale: false,
        needUpdateSecurityGroup: false,
        needRescaleVertically: false,
        needDeploy: false,
    };

    // UpdateAppSecurityGroup
    if (!lodash.isEmpty(localApp.securityGroupId) && !lodash.isEqual(localApp.securityGroupId, remoteApp.securityGroupId)) {
        change.needUpdateSecurityGroup = true;

        diffList.push({
            name: 'securityGroupId',
            local: localApp.securityGroupId,
            remote: remoteApp.securityGroupId
        });

    }
    // RescaleApplicationVertically
    if (localApp.cpu != remoteApp.cpu || localApp.memory != remoteApp.memory) {
        change.needRescaleVertically = true;
        if (localApp.cpu != remoteApp.cpu) {

            diffList.push({
                name: 'cpu',
                local: localApp.cpu,
                remote: remoteApp.cpu
            });
        }
        if (localApp.memory != remoteApp.memory) {
            diffList.push({
                name: 'memory',
                local: localApp.memory,
                remote: remoteApp.memory
            });
        }
    }
    // RescaleApplication
    if (localApp.replicas != remoteApp.replicas) {
        change.needRescale = true;
        diffList.push({
            name: 'replicas',
            local: localApp.replicas,
            remote: remoteApp.replicas
        });

    }
    delete localApp.securityGroupId;
    delete localApp.cpu;
    delete localApp.replicas;

    for (let key in localApp) {
        const localV = await formatArray(localApp[key]);
        const remoteV = await formatArray(remoteApp[key]);
        if (!lodash.isEqual(localV, remoteV)) {
            diffList.push({
                name: key,
                local: JSON.stringify(localV),
                remote: JSON.stringify(remoteV)
            });
            change.needDeploy = true;
        }
    }

    // 对比 code
    delete code.ossConfig;
    for (let key in code) {
        if (code[key] != remoteApp[key]) {
            diffList.push({
                name: key,
                local: code[key],
                remote: remoteApp[key]
            });
            change.needDeploy = true;
        }
    }

    // 对比 slb
    const remotePort = remoteSlb['Internet'].length > 0 ? remoteSlb['Internet'][0]['targetPort'] : null;
    if (port != remotePort) {
        diffList.push({
            name: 'port',
            local: port,
            remote: remotePort
        });
    }
    const localSlb = await formatSlb(slb, port);
    for (let key in localSlb) {
        let temp = localSlb[key];
        if (typeof temp == 'string') {
            temp = JSON.parse(localSlb[key]);
        }
        if (!lodash.isEqual(temp, remoteSlb[key])) {
            diffList.push({
                name: key,
                local: JSON.stringify(temp),
                remote: JSON.stringify(remoteSlb[key])
            });
        }
    }

    console.log(`📑 Config check:\n\rOnline status => Target Status`);
    for (let data of diffList) {
        console.log(`${data.name}: ${data.remote} => ${data.local}`);
    }

    // 用户选择
    // lastDeploy == localApp && remoteApp != localApp ----> 用户选择local或remote
    // lastDeploy != localApp ----> 自动选择local
    const lastDeploy = await getDeployCache(credentials.AccountID, localApp.region, localApp.appName, configPath);
    if (!lodash.isEqual(lastDeploy?.props?.application, application) || !lodash.isEqual(lastDeploy?.props?.slb, slb)) {
        change.updateRemote = true;
    } else {
        const configInquire = getInquire(application.appName);
        const ans: { option: string } = await inquirer.prompt(configInquire);
        switch (ans.option) {
            case 'use local':
                change.updateRemote = true;
                break;
            case 'use remote':
                break;
            default:
                break;
        }
    }
    return change;
}

async function formatSlb(slb: any, port: any) {
    let newSlb = slb;
    if (lodash.isEqual(slb, 'auto')) {
        newSlb = {
            Internet: [{ "port": 80, "targetPort": port, "protocol": "HTTP" }]
        };
    } else {
        // 使用用户配置的slb
        if (slb.Internet && typeof slb.Internet == 'object' && slb.Internet.length > 0) {
            newSlb.Internet = JSON.stringify(slb.Internet);
        }
        if (slb.Intranet && typeof slb.Intranet == 'object' && slb.Intranet.length > 0) {
            newSlb.Intranet = JSON.stringify(slb.Intranet);
        }
    }
    return newSlb;
}

async function slbLower(slb: any) {
    let newSlb = lodash.cloneDeep(slb);
    const remoteIntranet = JSON.parse(JSON.stringify(slb['Intranet']));
    const remoteInternet = JSON.parse(JSON.stringify(slb['Internet']));
    for (var datum of remoteInternet) {
        for (var key in datum) {
            if (/^[A-Z].*$/.test(key)) {
                let Key = key.replace(key[0], key[0].toLowerCase());
                datum[Key] = datum[key];
                delete (datum[key]);
            }
        }
    }

    for (var datum of remoteIntranet) {
        for (var key in datum) {
            if (/^[A-Z].*$/.test(key)) {
                let Key = key.replace(key[0], key[0].toLowerCase());
                datum[Key] = datum[key];
                delete (datum[key]);
            }
        }
    }
    newSlb['Intranet'] = remoteIntranet;
    newSlb['Internet'] = remoteInternet;
    return newSlb;
}

async function formatArray(param: any) {
    let res = lodash.cloneDeep(param);
    if (isString(param)) {
        const trimStr = param.trim();
        if (trimStr.startsWith('[') && trimStr.endsWith(']'))
            res = JSON.parse(trimStr);
    }
    return res;
}