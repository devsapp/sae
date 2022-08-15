import * as core from '@serverless-devs/core';
import Oss from './oss.service';
import Client, { vpcAvailable } from './client';
import { OutputProps } from '../interface/entity';
import { isNumber, isString } from 'lodash';

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
    configs['component'] = 'devsapp/sae@dev';
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
    if(isString(slb.Internet)){
        localInternet = JSON.parse(slb.Internet);
    }
    let localIntranet = slb.Intranet;
    if(isString(slb.Intranet)){
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
        console: `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${appId}&regionId=${application.RegionId}&namespaceId=${application.NamespaceId}`,
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
        result.slb = slbConfig['Data'];
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
        if (slb.Internet) {
            slb.Internet = JSON.stringify(slb.Internet);
        }
        if (slb.Intranet) {
            slb.Intranet = JSON.stringify(slb.Intranet);
        }
    }
    return { slb };
}

export async function handleCode(application: any, credentials: any, configPath?: string) {
    const { AccountID } = credentials;
    const { region, code, appName, namespaceId } = application;
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

export async function getDiff(application:any, slb:any, remoteData: any) {
    const appId = application.AppId;
    const remoteApp = await infoRes(remoteData);
    
    return {};
}