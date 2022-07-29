import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import Client from './common/client';
import * as utils from './common/utils';

import logger from './common/logger';

export default class SaeComponent {
  async info(inputs: InputProps) {
    let { props: { region, application } } = inputs;
    let credentials = await core.getCredential(inputs.project.access);
    let { AccessKeyID, AccessKeySecret } = credentials
    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);
    let data = await Client.saeClient.listApplications(application.name);
    if(data['Data']['Applications'].length==0){
      logger.error(`未找到应用 ${application.name}，请先使用 's deploy' 命令进行部署`);
    }else{
      let res = data['Data']['Applications'][0];
      return res;
    }
  }

  async deploy(inputs: InputProps) {
    let appId: any
    let { props: { region, application, slb } } = inputs;
    let credentials = await core.getCredential(inputs.project.access)
    let { AccessKeyID, AccessKeySecret } = credentials
    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);

    // 创建Namespace
    const vm = spinner('创建Namespace...');
    const env = await utils.handleEnv(inputs, application, credentials);
    slb = env.slb;

    vm.text = `上传代码...`;
    const applicationObject = await utils.handleCode(region, application, credentials);
    await utils.setDefault(applicationObject);

    try {
      vm.text = `创建应用 ...`
      let obj = await Client.saeClient.createApplication(applicationObject);
      appId = obj['Data']['AppId'];
      applicationObject.AppId = appId;
    } catch (e) {
      if (e.message.includes('AppName is exsited')) {
        vm.text = `应用已存在，进行更新 ...`
        appId = await Client.saeClient.updateApplication(applicationObject);
      } else {
        throw e
      }
    }

    // 检查应用部署状态
    vm.text = `部署应用 ...`
    await utils.checkStatus(appId, 'CoDeploy')

    let slbConfig = null;
    let addr = null;
    // 绑定SLB
    if (slb) {
      vm.text = `部署 slb ... `;
      await Client.saeClient.bindSLB(slb, appId);

      // 检查应用部署状态
      vm.text = `检查SLB绑定状态 ...`;
      await utils.checkStatus(appId, 'CoBindSlb');

      // 获取SLB信息
      vm.text = `获取SLB信息 ... `
      slbConfig = await Client.saeClient.getSLB(appId);
      addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
    }
    vm.stop();
    logger.success(`部署成功，请通过以下地址访问您的应用：${addr}`);
    logger.success('应用详细信息如下：');
    const result = utils.output(applicationObject, slbConfig);
    return result;
  }
}
