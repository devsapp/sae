import * as core from '@serverless-devs/core';
import { InputProps } from './interface/entity';
// @ts-ignore
import { spinner, inquirer } from "@serverless-devs/core";

import Client from './lib/client';
import * as utils from './lib/utils';
import * as inputHandler from './lib/input-handler';
import * as outputHandler from './lib/output-handler';
import * as HELP from './lib/help';
import logger from './common/logger';
import { getInquire } from './lib/help/constant';
import Oss from './lib/oss.service';
import { writeCreatCache } from './common/cache';
import WriteFile from './lib/write-file';

const { lodash } = core;
export default class SaeComponent {
  async sync(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    let appNameLocal = application.appName;
    const { isHelp, appName } = await inputHandler.handlerSyncInputs(args);
    if (isHelp) {
      core.help(HELP.SYNC);
      return;
    }
    if(!lodash.isEmpty(appName)){
      appNameLocal = appName;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    let data = await Client.saeClient.listApplications(appNameLocal);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appNameLocal}`);
      return;
    }
    const vm = spinner(`导出配置`);
    const app = data['Data']['Applications'][0];
    const res = await utils.infoRes(app);

    WriteFile.access = inputs.project.access;
    const configs = await utils.getSyncConfig(inputs, res);
    const configYmlPath = await WriteFile.writeSYml(process.cwd(), configs, appNameLocal);
    vm.stop();
    logger.success(`配置文件已成功下载：${configYmlPath}`);
    return { configs, configYmlPath };;
  }

  async rescale(inputs: InputProps){
    const { args, props: { application } } = inputs;
    let appNameLocal = application.appName;
    const { isHelp, replicas, appName } = await inputHandler.handlerReScaleInputs(args);
    if (isHelp) {
      core.help(HELP.RESCALE);
      return;
    }
    if(!lodash.isEmpty(appName)){
      appNameLocal = appName;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    let data = await Client.saeClient.listApplications(appNameLocal);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appNameLocal}`);
      return;
    }
    const appId = data['Data']['Applications'][0]['AppId'];
    const vm = spinner(`应用扩缩容`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.rescaleApplication(appId, replicas);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    // 检查状态
    vm.text = `应用扩缩容${appNameLocal}... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${orderId}`;
    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('完成应用扩缩容');
    return ;
  }

  // empty commander
  async plan() {
    return {};
  }

  async start(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    let appNameLocal = application.appName;
    const { isHelp, assumeYes, appName } = await inputHandler.handlerStartInputs(args);
    if (isHelp) {
      core.help(HELP.START);
      return;
    }
    if(!lodash.isEmpty(appName)){
      appNameLocal = appName;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    let data = await Client.saeClient.listApplications(appNameLocal);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appNameLocal}`);
      return;
    }
    if (!assumeYes) {
      try {
        const startStatus = await outputHandler.startPlan();
        if (startStatus !== 'assumeYes') {
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
    const vm = spinner(`启动应用`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.startApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    // 检查状态
    vm.text = `启动应用${appNameLocal}... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${orderId}`;

    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('已启动应用');

    const data2 = await Client.saeClient.listApplications(appNameLocal);
    const app = data2['Data']['Applications'][0];
    const res = await utils.infoRes(app);
    res.componentType = "sae";
    return res;
  }

  async stop(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    let appNameLocal = application.appName;
    const { isHelp, assumeYes, appName } = await inputHandler.handlerStopInputs(args);
    if (isHelp) {
      core.help(HELP.STOP);
      return;
    }
    if(!lodash.isEmpty(appName)){
      appNameLocal = appName;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(application.region, credentials);
    let data = await Client.saeClient.listApplications(appNameLocal);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appNameLocal}`);
      return;
    }
    if (!assumeYes) {
      try {
        const stopStatus = await outputHandler.stopPlan();
        if (stopStatus !== 'assumeYes') {
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
    const vm = spinner(`停止应用${appNameLocal}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.stopApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    // 检查状态
    vm.text = `停止应用${appNameLocal}... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${orderId}`;
    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('已停止应用');
  }

  async info(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, outputFile } = await inputHandler.handlerInfoInputs(args);
    if (isHelp) {
      core.help(HELP.INFO);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    const { appName, region } = application || {};
    await Client.setSaeClient(region, credentials);
    const data = await Client.saeClient.listApplications(appName);
    if (data['Data']['Applications'].length === 0) {
      logger.error(`未找到应用 ${appName}，请先使用 's deploy' 命令进行部署`);
    } else {
      const app = data['Data']['Applications'][0];
      const res = await utils.infoRes(app);
      res.componentType = "sae";

      if (outputFile) {
        let cache: any = {};
        try {
          cache = core.fse.readJsonSync(outputFile);
        } catch (_e) {
          /**/
        }
        cache[appName] = res;
        await core.fse.outputFile(outputFile, JSON.stringify(cache, null, 2));
      }

      return res;
    }
  }

  async deploy(inputs: InputProps) {
    let appId: any;
    const configPath = core.lodash.get(inputs, 'path.configPath');
    let { args, props: { application, slb } } = inputs;
    const { appName, region } = application;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const { isHelp, useLocal, useRemote } = await inputHandler.parseCommand(args);
    if (isHelp) {
      core.help(HELP.DEPLOY);
      return;
    }
    const remoteData = await Client.saeClient.listApplications(appName);
    if (useLocal) {
      // go on
    } else if (useRemote) {
      if (remoteData['Data']['Applications'].length === 0) {
        logger.error(`未找到应用 ${appName}，请先使用 's deploy' 命令进行部署`);
        return;
      }
      const app = remoteData['Data']['Applications'][0];
      return await utils.infoRes(app);
    } else {
      if (remoteData['Data']['Applications'].length > 0) {
        const configInquire = getInquire(appName);
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
    const env = await utils.handleEnv(slb, application, credentials);
    slb = env.slb;

    vm.text = `上传代码...`;
    const applicationObject = await utils.handleCode(application, credentials, configPath);
    await inputHandler.setDefault(applicationObject);
    let changeOrderId: any;
    let needBindSlb = true;
    try {
      vm.text = `创建应用 ...`;
      let obj = await Client.saeClient.createApplication(applicationObject);
      appId = obj['Data']['AppId'];
      changeOrderId = obj['Data']['ChangeOrderId'];
      applicationObject.AppId = appId;

      await writeCreatCache(
        {
          region,
          appName,
          configPath,
          accountID: credentials.AccountID,
        },
        { appId },
      );
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
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${region}`;
    await utils.getStatusByOrderId(changeOrderId);
    if (needBindSlb) {
      // 绑定SLB
      vm.text = `部署 slb ... `;
      changeOrderId = await Client.saeClient.bindSLB(slb, appId);
      // 检查应用部署状态
      vm.text = `正在绑定slb... 查看详情：
    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}&regionId=${region}`;
      await utils.checkStatus(appId, 'CoBindSlb');
    }

    // 获取SLB信息
    vm.text = `获取 slb 信息 ... `;
    const slbConfig = await Client.saeClient.getSLB(appId);
    vm.stop();
    const result = await outputHandler.output(applicationObject, slbConfig);

    logger.success(`部署成功，请通过以下地址访问您的应用：http://${result.accessLink}`);

    /**
     * 删除oss文件
     */
    const file = await utils.file2delete(region, application, credentials);
    if (file.filename) {
      vm.text = `删除 oss 文件 ... `;
      const oss = new Oss({ bucket: file.bucketName, region: region, credentials });
      await oss.deleteFile(file.filename);
    }

    logger.success('应用详细信息如下：');
    return result;
  }

  async remove(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    let appNameLocal = application.appName;
    const { isHelp, assumeYes, appName } = await inputHandler.handlerRmInputs(args);
    if (isHelp) {
      core.help(HELP.REMOVE);
      return;
    }
    if(!lodash.isEmpty(appName)){
      appNameLocal = appName;
    }
    const { region } = application || {};
    const credentials = await core.getCredential(inputs.project?.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appNameLocal);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appNameLocal}`);
      return;
    }
    const app = data['Data']['Applications'][0];
    const res = await utils.infoRes(app);
    if (!assumeYes) {
      try {
        const removeStatus = await outputHandler.removePlan(res);
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
    const appId = app['AppId'];
    const vm = spinner(`删除应用${appNameLocal}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.deleteApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error.result.Message}`);
      return;
    }
    await utils.getStatusByOrderId(orderId);

    vm.stop();
    logger.success('删除成功');
  }
}
