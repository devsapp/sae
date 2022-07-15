import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import Client from './common/client';
import { checkStatus, handleEnv, handleCode, setDefault } from './common/utils';


export default class SaeComponent {

  async deploy(inputs: InputProps) {
    let appId: any
    let { props: { region, namespace, application, slb } } = inputs;
    let credentials = await core.getCredential(inputs.project.access)
    let { AccessKeyID, AccessKeySecret } = credentials


    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);

    // 创建Namespace
    const vm = spinner('创建Namespace...');
    const env = await handleEnv(inputs, application);
    namespace = env.namespace;

    vm.text = `上传代码...`;
    const applictionObject = await handleCode(region, application, credentials);
    await setDefault(applictionObject);

    try {
      vm.text = `创建应用 ...`
      let obj = await Client.saeClient.createApplication(applictionObject);
      appId = obj['Data']['AppId'];
      applictionObject.AppId = appId;
    } catch (e) {
      throw e
    }

    // 检查应用部署状态
    vm.text = `部署应用 ...`
    await checkStatus(appId, 'CoDeploy')

    const result = {
      "namespace": namespace,
      "application": {
        appId: appId,
        name: application.name
      },
      "Console": `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${appId}&regionId=${region}&namespaceId=${namespace.id}`
    }

    // 绑定SLB
    if (slb) {
      vm.text = `部署 slb ... `;
      await Client.saeClient.bindSLB(slb, appId);

      // 检查应用部署状态
      vm.text = `检查SLB绑定状态 ...`;
      await checkStatus(appId, 'CoBindSlb');

      // 获取SLB信息
      vm.text = `获取SLB信息 ... `
      const slbConfig = await Client.saeClient.getSLB(appId);

      
      if (slbConfig["Data"]['InternetIp']) {
        result['slb'] = {
          InternetIp: slbConfig["Data"]['InternetIp']
        };
      }
      if (slbConfig["Data"]['IntranetSlbId']) {
        result['slb'] = result['slb'] ? result['slb'] : {};
        result['slb']['IntranetSlbId'] = slbConfig["Data"]['InternetIp'];
      }
    }
    vm.stop();
    return result;
  }
}
