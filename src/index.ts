import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import Client from './common/client';
import * as utils from './common/utils';
import * as HELP from './lib/help';
import logger from './common/logger';

export default class SaeComponent {
  isHelp(args: string, argsObj?: any) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args, argsObj }, this.MINIMIST_HELP_OPT);
    const data = comParse?.data
    return data?.h || data?.help;
  }

  async info(inputs: InputProps) {
    const { args, props: { region, application } } = inputs;
    if (this.isHelp(args)) {
      core.help(HELP.INFO);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    const { AccessKeyID, AccessKeySecret } = credentials;
    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);
    const data = await Client.saeClient.listApplications(application.name);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${application.name}，请先使用 's deploy' 命令进行部署`);
    } else {
      const app = data['Data']['Applications'][0];
      const res = await utils.infoRes(app);
      return res;
    }
  }

  async deploy(inputs: InputProps) {
    let appId: any;
    let { props: { region, application, slb } } = inputs;
    const credentials = await core.getCredential(inputs.project.access);
    const { AccessKeyID, AccessKeySecret } = credentials;
    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);

    // 创建Namespace
    const vm = spinner('创建Namespace...');
    const env = await utils.handleEnv(inputs, application, credentials);
    slb = env.slb;

    vm.text = `上传代码...`;
    const applicationObject = await utils.handleCode(region, application, credentials);
    await utils.setDefault(applicationObject);
    let changeOrderId :any;
    try {
      vm.text = `创建应用 ...`
      let obj = await Client.saeClient.createApplication(applicationObject);
      appId = obj['Data']['AppId'];
      changeOrderId = obj['Data']['ChangeOrderId'];
      applicationObject.AppId = appId;
    } catch (e) {
      if (e.message.includes('AppName is exsited')) {
        vm.text = `应用已存在，进行更新 ...`;
        try {
          let res = await Client.saeClient.updateApplication(applicationObject);
          appId = res['Data']['AppId'];
          changeOrderId = res['Data']['ChangeOrderId'];
        } catch (error) {
          vm.stop();
          logger.error(`${error.result.Message}`);
          return;
        }
      } else {
        vm.stop();
        logger.error(`${e.result.Message}`);
        return;
      }
    }

    // 检查应用部署状态
    vm.text = `应用有变更流程正在执行, 处于执行中状态。查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${region}`;
    await utils.getStatusByOrderId(changeOrderId);

    let slbConfig = null;
    let addr = null;
    // 绑定SLB
    if (slb) {
      vm.text = `部署 slb ... `;
      changeOrderId = await Client.saeClient.bindSLB(slb, appId);

      // 检查应用部署状态
      vm.text = `应用有变更流程正在执行, 处于执行中状态。查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${region}`;
      await utils.checkStatus(appId, 'CoBindSlb');

      // 获取SLB信息
      vm.text = `获取 slb 信息 ... `;
      slbConfig = await Client.saeClient.getSLB(appId);
      addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
    }
    vm.stop();
    logger.success(`部署成功，请通过以下地址访问您的应用：${addr}`);
    logger.success('应用详细信息如下：');
    const result = utils.output(applicationObject, slbConfig);
    return result;
  }

  async remove(inputs: InputProps) {
    const { props: { region, application } } = inputs;
    const credentials = await core.getCredential(inputs.project.access);
    const { AccessKeyID, AccessKeySecret } = credentials;
    await Client.setSaeClient(region, AccessKeyID, AccessKeySecret);
    let data = await Client.saeClient.listApplications(application.name);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${application.name}，请先使用 's deploy' 命令进行部署`);
      return;
    }
    const appId = data['Data']['Applications'][0]['AppId'];
    const vm = spinner(`删除应用${application.name}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.deleteApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    await utils.getStatusByOrderId(orderId);
    if (application.code.package) {
      vm.text = `删除 oss 文件 ... `;
      await utils.deleteOssFile(region, application, credentials);
    }
    vm.stop();
    logger.success('删除成功');
  }
}
