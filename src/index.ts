import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import Client from './client';
import { handleCode} from './utils';


export default class SaeComponent {

  async handleEnv(inputs: InputProps) {
    let { props: { Namespace, VPCConfig } } = inputs;
    let AutoConfig = false;
    if (!Namespace&&!VPCConfig) {
      // 自动配置
      AutoConfig = true;
    }else if(!Namespace&&VPCConfig){
      // 使用默认命名空间
      Namespace = await Client.saeClient.getNamespace();
    }else if(Namespace&&!VPCConfig){
      throw new Error("The specified parameter 'VPCConfig' is invalid.")
    } else {
      try {
        await Client.saeClient.createNamespace(Namespace);
      } catch (e) {
        if(e.message.includes('The specified namespace ID already exists')){
          // The specified namespace ID already exists
          await Client.saeClient.updateNamespace(Namespace);
        }else{
          throw e
        }
      }
    }
    return { Namespace, VPCConfig, AutoConfig }
  }

  async checkStatus(appId, coType) {
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
          throw new Error('应用状态为：执行失败')
        } else if (tempStatus === 6) {
          throw new Error('应用状态为：终止')
        } else if (tempStatus === 10) {
          throw new Error('应用状态为：系统异常执行失败')
        }
      } catch (e) {
        throw e
      }
      // 等待1s
      await new Promise(f => setTimeout(f, 1000));
    }
  }

  async deploy(inputs: InputProps) {
    // console.log(inputs)
    let AppId: any
    let { props: { Region, Namespace, Application, SLB } } = inputs;
    let credentials = await core.getCredential(inputs.project.access)
    let { AccessKeyID, AccessKeySecret } = credentials


    await Client.setSaeClient(Region, AccessKeyID, AccessKeySecret);

    // 创建/更新Namespace
    const vm = spinner('开始部署');
    const env = await this.handleEnv(inputs);
    Namespace = env.Namespace;

    vm.text = `部署Appliction: ${Application.AppName}`
    // console.log("====Application====");
    // console.log(Application);

    const codeData = await handleCode(Application, inputs, credentials);

    const applictionObject = codeData.applictionObject;
    applictionObject.AutoConfig = env.AutoConfig;

    const codePackage = codeData.codePackage;
    const tempObject = codeData.tempObject;
    vm.text = `上传代码：${codePackage.Bucket.Region} / ${codePackage.Bucket.Name} / ${tempObject}`

    try {
      vm.text = `尝试创建应用 ...`
      let obj = await Client.saeClient.createApplication(applictionObject);
      AppId = obj['Data']['AppId'];
      applictionObject.AppId = AppId;
    } catch (e) {
        throw e
    }

    // 检查应用部署状态
    vm.text = `检查部署状态 ...`
    await this.checkStatus(AppId, 'CoDeploy')

    const result = {
      "Namespace": Namespace,
      "Application": {
        AppId: AppId,
        AppName: Application.AppName
      },
      "Console": `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${AppId}&regionId=${Region}&namespaceId=${Namespace.NamespaceId}`
    }

    // 绑定SLB
    if (SLB) {
      vm.text = `部署SLB ... `;
      if (SLB.Internet && typeof SLB.Internet == 'object') {
        SLB.Internet = JSON.stringify(SLB.Internet)
      }
      if (SLB.Intranet && typeof SLB.Intranet == 'object') {
        SLB.Intranet = JSON.stringify(SLB.Intranet)
      }
      if (AppId) {
        SLB.AppId = AppId
      }
      await Client.saeClient.bindSLB(SLB);

      // 检查应用部署状态
      vm.text = `检查SLB绑定状态 ...`
      await this.checkStatus(AppId, 'CoBindSlb');

      // 获取SLB信息
      vm.text = `获取SLB信息 ... `
      const slbConfig = await Client.saeClient.getSLB(AppId);
      if (slbConfig["Data"]['InternetIp']) {
        result['SLB'] = {
          InternetIp: slbConfig["Data"]['InternetIp']
        };
      }
      if (slbConfig["Data"]['IntranetSlbId']) {
        result['SLB'] = result['SLB'] ? result['SLB'] : {};
        result['SLB']['IntranetSlbId'] = slbConfig["Data"]['InternetIp'];
      }
    }
    vm.stop();
    console.log("-------res------------");
    console.log(result);
    return result
  }
}
