import * as core from '@serverless-devs/core';
import { InputProps } from './interface/entity';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import Client from './lib/client';
import * as utils from './lib/utils';
import * as inputHandler from './lib/input-handler';
import * as outputHandler from './lib/output-handler';
import * as HELP from './lib/help';
import logger from './common/logger';
import Oss from './lib/oss.service';
import { writeCreatCache, writeDeployCache } from './common/cache';
import WriteFile from './lib/write-file';
import { SaeCtlCmd } from './cmd/saectl';

const { lodash } = core;

const getLink = (changeOrderId) => `查看详情：
https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=${changeOrderId}`;


export default class SaeComponent {
  async sync(inputs: InputProps) {
    const { args } = inputs;
    const { isHelp, appName, namespaceId, region } = await inputHandler.handlerSyncInputs(args);
    if (isHelp) {
      core.help(HELP.SYNC);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appName, namespaceId);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appName}`);
      return;
    }
    const vm = spinner(`导出配置`);
    const app = data['Data']['Applications'][0];
    const res = await utils.infoRes(app);

    WriteFile.access = inputs.project.access;
    WriteFile.projectName = inputs.project.projectName;
    const configs = await utils.getSyncConfig(inputs, res);
    const configYmlPath = await WriteFile.writeSYml(process.cwd(), configs, region, app['namespaceId'], appName);
    vm.stop();
    logger.success(`配置文件已成功下载：${configYmlPath}`);
    return { configs, configYmlPath };;
  }

  async rescale(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, replicas, appName, namespaceId, region } = await inputHandler.handlerReScaleInputs(args, application);
    if (isHelp) {
      core.help(HELP.RESCALE);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appName, namespaceId);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appName}`);
      return;
    }
    const appId = data['Data']['Applications'][0]['AppId'];
    const vm = spinner(`应用扩缩容`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.rescaleApplication(appId, replicas);
    } catch (error) {
      vm.stop();
      logger.error(`${error}`);
      return;
    }
    if (lodash.isEmpty(orderId)) {
      vm.stop();
      logger.success('replicas无变动');
      return;
    }
    // 检查状态
    vm.text = `应用扩缩容${appName}...` + getLink(orderId);
    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('完成应用扩缩容');
    return;
  }

  // empty commander
  async plan() {
    return {};
  }

  async start(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, assumeYes, appName, namespaceId, region } = await inputHandler.handlerStartInputs(args, application);
    if (isHelp) {
      core.help(HELP.START);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appName, namespaceId);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appName}`);
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
      logger.error(`${error}`);
      return;
    }
    // 检查状态
    vm.text = `启动应用${appName}...` + getLink(orderId);

    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('已启动应用');

    const data2 = await Client.saeClient.listApplications(appName, namespaceId);
    const app = data2['Data']['Applications'][0];
    const res = await utils.infoRes(app);
    res.componentType = "sae";
    return res;
  }

  async stop(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, assumeYes, appName, namespaceId, region } = await inputHandler.handlerStopInputs(args, application);
    if (isHelp) {
      core.help(HELP.STOP);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appName, namespaceId);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appName}`);
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
    const vm = spinner(`停止应用${appName}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.stopApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error}`);
      return;
    }
    // 检查状态
    vm.text = `停止应用${appName}...` + getLink(orderId);
    await utils.getStatusByOrderId(orderId);
    vm.stop();
    logger.success('已停止应用');
  }

  async info(inputs: InputProps) {
    const { args, props: { application } } = inputs;
    const { isHelp, outputFile, appName, namespaceId, region } = await inputHandler.handlerInfoInputs(args, application);
    if (isHelp) {
      core.help(HELP.INFO);
      return;
    }
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    const data = await Client.saeClient.listApplications(appName, namespaceId);
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
    await inputHandler.checkInputs(inputs);
    let appId: any;
    const configPath = core.lodash.get(inputs, 'path.configPath');
    const { args, props } = inputs;
    let { application, slb } = props;
    const { appName, region } = application;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const { isHelp, useLocal, useRemote } = await inputHandler.parseCommand(args);
    let updateRemote = false;
    let remoteAppId = null;
    let change = {};
    if (isHelp) {
      core.help(HELP.DEPLOY);
      return;
    }
    // 设置Namespace
    await utils.handleEnv(application, credentials);

    // 设置slb
    slb = await utils.formatSlb(slb, application.port);

    const namespaceId = application.namespaceId;
    const remoteData = await Client.saeClient.listApplications(appName, namespaceId);
    if (useLocal) {
      if (remoteData['Data']['Applications'].length > 0) {
        updateRemote = true;
      }
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
        change = await utils.getDiff(application, slb, remoteData['Data']['Applications'][0], credentials, configPath);
        updateRemote = change['updateRemote'];
        if (!updateRemote) {
          const app = remoteData['Data']['Applications'][0];
          return await utils.infoRes(app);
        }
      }
    }
    const lastProps = lodash.cloneDeep(props);
    // 查询发布单
    if (remoteData['Data']['Applications'].length > 0) {
      const app = remoteData['Data']['Applications'][0];
      remoteAppId = app.AppId;
      const orderList = await Client.saeClient.listChangeOrders(app.AppId, '');
      const changeOrder = orderList['Data']['ChangeOrderList'];
      for (const order of changeOrder) {
        if (lodash.isEqual(order['Status'], 1)) {
          logger.info(`当前应用有正在执行的变更单。` + getLink(order['ChangeOrderId']));
          return;
        }
      }
    }

    const vm = spinner('上传代码...');
    const applicationObject = await utils.handleCode(application, credentials, configPath);
    await inputHandler.setDefault(applicationObject);
    let changeOrderId: any;
    if (updateRemote) {
      appId = remoteAppId;
      try {
        if (change['needDeploy']) {
          let res = await Client.saeClient.updateApplication(applicationObject);
          changeOrderId = res['Data']['ChangeOrderId'];
          // 检查应用部署状态
          vm.text = `应用正在部署...` + getLink(changeOrderId);
          await utils.getStatusByOrderId(changeOrderId);
        }

        if (change['needRescale']) {
          changeOrderId = await Client.saeClient.rescaleApplication(remoteAppId, applicationObject.Replicas);
          // 检查应用部署状态
          vm.text = `应用扩缩容...` + getLink(changeOrderId);
          await utils.getStatusByOrderId(changeOrderId);
        }
        if (change['needUpdateSecurityGroup']) {
          changeOrderId = await Client.saeClient.updateSecurityGroup(remoteAppId, applicationObject.securityGroupId);
          // 检查应用部署状态
          vm.text = `更新应用安全组...` + getLink(changeOrderId);
          await utils.getStatusByOrderId(changeOrderId);
        }
        if (change['needRescaleVertically']) {
          changeOrderId = await Client.saeClient.rescaleVertically(remoteAppId, applicationObject.Cpu, applicationObject.Memory);
          // 检查应用部署状态
          vm.text = `更改应用实例规格...` + getLink(changeOrderId);
          await utils.getStatusByOrderId(changeOrderId);
        }
      } catch (error) {
        vm.stop();
        logger.error(`${error}`);
        return;
      }
    } else {
      try {
        vm.text = `创建应用 ...`;
        let obj = await Client.saeClient.createApplication(applicationObject);
        appId = obj['Data']['AppId'];
        changeOrderId = obj['Data']['ChangeOrderId'];
        applicationObject.AppId = appId;
        // 检查应用部署状态
        vm.text = `应用正在部署...` + getLink(changeOrderId);
        await utils.getStatusByOrderId(changeOrderId);
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
        vm.stop();
        logger.error(`${e}`);
        return;
      }
    }
    if (!lodash.isEmpty(slb)) {
      const needBindSlb = await utils.slbDiff(slb, appId);
      if (needBindSlb) {
        // 绑定SLB
        vm.text = `部署 slb ... `;
        changeOrderId = await Client.saeClient.bindSLB(slb, appId);
        // 检查应用部署状态
        vm.text = `正在绑定slb...` + getLink(changeOrderId);
        await utils.checkStatus(appId, 'CoBindSlb');
      }
    }

    vm.stop();
    const result = await outputHandler.output(appName, namespaceId);
    if (!lodash.isEmpty(result.accessLink)) {
      logger.success(`部署成功，请通过以下地址访问您的应用：http://${result.accessLink}`);
    }

    /**
     * 缓存记录上一次部署细节
     */
    await writeDeployCache(
      {
        region,
        appName,
        configPath,
        accountID: credentials.AccountID,
      },
      lastProps,
    );
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
    const { isHelp, assumeYes, appName, namespaceId, region } = await inputHandler.handlerRmInputs(args, application);
    if (isHelp) {
      core.help(HELP.REMOVE);
      return;
    }
    const credentials = await core.getCredential(inputs.project?.access);
    await Client.setSaeClient(region, credentials);
    let data = await Client.saeClient.listApplications(appName, namespaceId);
    if (data['Data']['Applications'].length == 0) {
      logger.error(`未找到应用 ${appName}`);
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
    const vm = spinner(`删除应用${appName}...`);
    let orderId: any;
    try {
      orderId = await Client.saeClient.deleteApplication(appId);
    } catch (error) {
      vm.stop();
      logger.error(`${error}`);
      return;
    }
    await utils.getStatusByOrderId(orderId);

    vm.stop();
    logger.success('删除成功');
  }

  async saectl(inputs: InputProps) {
    const credentials = await core.getCredential(inputs.project?.access);
    let saeCtlCmd = new SaeCtlCmd(inputs, credentials);
    await saeCtlCmd.run();
  }
}
