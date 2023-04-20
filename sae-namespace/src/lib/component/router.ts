import * as core from '@serverless-devs/core';
import Client from '../client';
import logger from '../../common/logger';
import _ from 'lodash';
import { diffArray, tableShow } from '../utils';

// @ts-ignore

const SECRET_COMMAND: string[] = ['list', 'create', 'delete', 'update', 'info', 'deploy'];

export default class Router {
  static async handlerInputs(inputs) {
    logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);

    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {});

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];

    const subCommand = rawData[0];
    logger.debug(`version subCommand: ${subCommand}`);
    if (!SECRET_COMMAND.includes(subCommand)) {
      throw new core.CatchableError(`Does not support ${subCommand} command`);
    }

    const props = inputs.props || {};

    return {
      subCommand,
      props,
    };
  }

  async deploy(inputs) {
    const { props } = inputs;
    const { router } = props;
    const routerList = await this.list(inputs);

    const { createQueue, updateQueue } = diffArray(router, routerList, 'name', 'Description', 'Id');

    await Promise.all(_.map([...createQueue, ...updateQueue], async (item) => {
      if (item.id) {
        await this.update(inputs, item)
      } else {
        await this.create(inputs, item)
      }
    }))

    return await this.list(inputs);
  }

  async create(inputs, router) {
    const { props } = inputs;
    const { region, id } = props;
    const { name, type, protocol, cert = '', port, slbId, rules, defaultRule } = router;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    try {
      await Client.saeClient.createRouter({
        namespaceId: id,
        description: name,
        listenerProtocol: protocol,
        slbId,
        listenerPort: port,
        rules,
        defaultRule,
        loadBalanceType: type,
        cert,
      });
    } catch (error) {
      logger.error(`${error}`);
    }
  }

  async update(inputs, router) {
    const { props } = inputs;
    const { region, id } = props;
    const { id: ingressId, name, type, protocol, cert = '', port, slbId, rules, defaultRule } = router;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    try {
      await Client.saeClient.updateRouter({
        namespaceId: id,
        ingressId,
        description: name,
        listenerProtocol: protocol,
        slbId,
        listenerPort: port,
        rules,
        defaultRule,
        loadBalanceType: type,
        cert,
      });
    } catch (error) {
      logger.error(`${error}`);
      return;
    }
  }

  async delete(inputs) {
    const { args, props } = inputs;
    const { region } = props;
    const argsArr = args.split(' ');
    const ingressId = argsArr[1];

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    await Client.saeClient.deleteRouter(ingressId);
  }
  
  async info(inputs) {
    const { args, props } = inputs;
    const { region } = props;
    const argsArr = args.split(' ');
    const ingressId = argsArr[1];
    
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const routerInfo = await Client.saeClient.describeRouter(ingressId);
    const { Rules, DefaultRule } = routerInfo;
    delete routerInfo.Rules;
    delete routerInfo.DefaultRule;
    delete routerInfo.Svcs;
    const allRules = [...Rules, DefaultRule]
    
    tableShow(allRules, ['Domain', 'Path', 'AppName', 'AppId', 'ContainerPort']);
  }

  async list(inputs: any) {
    const { props } = inputs;
    const { region, id } = props;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const ingressList = await Client.saeClient.listRouters(id);
    
    // tableShow(ingressList, ['Description', 'Id', 'SlbType', 'ListenerProtocol', 'CertId', 'ListenerPort', 'SlbId']);
    return ingressList;
  }
}
