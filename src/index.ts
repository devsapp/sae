import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { spinner, inquirer } from "@serverless-devs/core";

import Client from './common/client';
import * as utils from './common/utils';
import * as HELP from './lib/help';
import logger from './common/logger';
import { getInquire } from './lib/help/constant';

export default class SaeComponent {

  async info(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, outputFile } = await utils.handlerInfoInputs(args);
    if (isHelp) {
      core.help(HELP.INFO);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    const data = await Client.saeClient.listApplications(application.appName);
    if (data['Data']['Applications'].length === 0) {
      logger.error(`未找到应用 ${application.appName}，请先使用 's deploy' 命令进行部署`);
    } else {
      const app = data['Data']['Applications'][0];
      const res = await utils.infoRes(app);
      res.componentType="sae";

      if (outputFile) {
        let cache: any = {};
        try {
          cache = core.fse.readJsonSync(outputFile);
        } catch (_e) {
          /**/
        }
        cache[application.appName] = res;
        await core.fse.outputFile(outputFile, JSON.stringify(cache, null, 2));
      }

      return res;
    }
  }

  async deploy(inputs: InputProps) {
    let appId: any;
    let { args, props: { application } } = inputs;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);

    const { isHelp, useLocal, useRemote } = await utils.parseCommand(args);
    if (isHelp) {
      core.help(HELP.DEPLOY);
      return;
    }
    const remoteData = await Client.saeClient.listApplications(application.appName);
    if (useLocal) {
      // go on
    } else if (useRemote) {
      if (remoteData['Data']['Applications'].length === 0) {
        logger.error(`未找到应用 ${application.appName}，请先使用 's deploy' 命令进行部署`);
        return;
      }
      const app = remoteData['Data']['Applications'][0];
      return await utils.infoRes(app);
    } else {
      if (remoteData['Data']['Applications'].length > 0) {
        const configInquire = getInquire(application.appName);
        const ans: { option: string } = await inquirer.prompt(configInquire);
        switch (ans.option) {
          case 'use local':
            break;
          case 'use remote':
            const app = remoteData['Data']['Applications'][0];
            return await utils.infoRes(app);
          default:
            break;
        }
      }
    }

    // 创建Namespace
    const vm = spinner('设置Namespace...');
    const env = await utils.handleEnv(application, credentials);
    let slb = env.slb;

    vm.text = `上传代码...`;
    const applicationObject = await utils.handleCode(application, credentials);
    await utils.setDefault(applicationObject);
    let changeOrderId: any;
    let needBindSlb = true;
    try {
      vm.text = `创建应用 ...`
      let obj = await Client.saeClient.createApplication(applicationObject);
      appId = obj['Data']['AppId'];
      changeOrderId = obj['Data']['ChangeOrderId'];
      applicationObject.AppId = appId;
    } catch (e) {
      if (e.message.includes('AppName is exsited')) {
        try {
          let res = await Client.saeClient.updateApplication(applicationObject);
          appId = res['Data']['AppId'];
          changeOrderId = res['Data']['ChangeOrderId'];
          needBindSlb = await utils.needBindSlb(slb, appId);
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
    vm.text = `应用正在部署... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${application.region}`;
    await utils.getStatusByOrderId(changeOrderId);
    if (needBindSlb) {
      // 绑定SLB
      vm.text = `部署 slb ... `;
      changeOrderId = await Client.saeClient.bindSLB(slb, appId);

      // 检查应用部署状态
      vm.text = `正在绑定slb... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${application.region}`;
      await utils.checkStatus(appId, 'CoBindSlb');
    }

    // 获取SLB信息
    vm.text = `获取 slb 信息 ... `;
    const slbConfig = await Client.saeClient.getSLB(appId);
    vm.stop();
    const result = await utils.output(applicationObject, slbConfig);
    
    logger.success(`部署成功，请通过以下地址访问您的应用：http://${result.accessLink}`);
    logger.success('应用详细信息如下：');
    return result;
  }

  async remove(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, assumeYes } = await utils.handlerRmInputs(args);
    if (isHelp) {
      core.help(HELP.REMOVE);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    let data = await Client.saeClient.listApplications(application.appName);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${application.appName}`);
      return;
    }
    const file = await utils.file2delete(application.region, application, credentials);
    if (!assumeYes) {
      try {
        const removeStatus = await utils.removePlan(data['Data']['Applications'][0], file);
        if (removeStatus !== 'assumeYes') {
          return;
        }
      } catch (ex) {
        if (ex?.name === 'CatchableError') {
          throw ex;
        }
        // 异常：不作处理兜底
        logger.debug(`error: ${ex.message}`);
      }
    }
    const appId = data['Data']['Applications'][0]['AppId'];
    const vm = spinner(`删除应用${application.appName}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.deleteApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    await utils.getStatusByOrderId(orderId);
    if (file.filename) {
      vm.text = `删除 oss 文件 ... `;
      await utils.deleteFile(credentials, application.region, file.bucketName, file.filename);
    }
    vm.stop();
    logger.success('删除成功');
  }
}
