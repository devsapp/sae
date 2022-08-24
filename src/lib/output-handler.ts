import * as core from '@serverless-devs/core';
import Table from 'tty-table';
const { inquirer } = core;
import Client from '../lib/client';
import { infoRes } from './utils'

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
export async function removePlan(res: any) {
    console.log(`Need to delete the resource in the ${res.application.region} area:`);
    let namespaceHeader = [{
        value: "namespaceId",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "vpcId",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "vSwitchId",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "securityGroupId",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    }
    ];
    let namespaceData = [{
        namespaceId: res.application.namespaceId,
        vpcId: res.application.vpcId,
        vSwitchId: res.application.vSwitchId,
        securityGroupId: res.application.securityGroupId
    }
    ];
    console.log('\r\nnamespace:');
    console.log(Table(namespaceHeader, namespaceData).render());

    let appHeader = [{
        value: "appName",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "cpu",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "memory",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    {
        value: "runningInstances/instances",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40
    },
    ];
    let appData = [{
        appName: res.application.appName,
        cpu: res.application.cpu,
        memory: res.application.memory,
        "runningInstances/instances": String(res.application.runningInstances) + '/' + String(res.application.instances)
    }
    ];


    console.log('\r\napplication:');
    console.log(Table(appHeader, appData).render());

    let slbHeader = [{
        value: "slb",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 80
    },
    ];
    let slbData = [{
        slb: JSON.stringify(res.slb)
    }
    ]


    console.log('\r\nslb:');
    console.log(Table(slbHeader, slbData).render());

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

export async function output(appName) {
    const data = await Client.saeClient.listApplications(appName);
    const app = data['Data']['Applications'][0];
    const res = await infoRes(app);
    delete res.application.batchWaitTime;
    delete res.application.minReadyInstanceRatio;
    delete res.application.instances;
    delete res.application.runningInstances;
    delete res.application.appDeletingStatus;
    delete res.application.scaleRuleEnabled;

    if (res.slb['InternetIp']) {
        res.accessLink = res.slb.InternetIp + ':' + String(res.slb['Internet'][0]['Port']);
    }
    if (res.slb['IntranetIp']) {
        res.accessLink = res.slb.IntranetIp + ':' + String(res.slb['Intranet'][0]['Port']);
    }
    return res;
}
