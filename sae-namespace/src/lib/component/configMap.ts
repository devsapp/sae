import * as core from '@serverless-devs/core';
import Client from '../client';
import logger from '../../common/logger';
import _ from 'lodash';
import { diffArray } from '../utils';

const SECRET_COMMAND: string[] = ['list', 'create', 'delete', 'update', 'deploy'];

export default class ConfigMap {
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
    const { configMap } = props;
    const configMapList = await this.list(inputs);

    const { createQueue, updateQueue } = diffArray(configMap, configMapList, 'name', 'Name', 'ConfigMapId')

    await Promise.all(_.map([...createQueue, ...updateQueue], async (item) => {
      if (item.id) {
        await this.update(inputs, item)
      } else {
        await this.create(inputs, item)
      }
    }))

    return await this.list(inputs);
  }

  async create(inputs, configMap) {
    const { props } = inputs;
    const { region, id } = props;
    const { name, data } = configMap;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    try {
      await Client.saeClient.createConfigMap(id, name, data);
    } catch (error) {
      logger.error(`${error}`);
    }
  }

  async update(inputs, configMap) {
    const { props } = inputs;
    const { region} = props;
    const { id: configMapId, data, description } = configMap;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    try {
      await Client.saeClient.updateConfigMap(configMapId, data, description);
    } catch (error) {
      logger.error(`${error}`);
    }
  }

  async delete(inputs) {
    const { args, props } = inputs;
    const { region } = props;
    const argsArr = args.split(' ');
    const configMapId = argsArr[1];

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    await Client.saeClient.deleteConfigMap( configMapId);
  }

  async list(inputs: any) {
    const { props } = inputs;
    const { region, id } = props;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);
    const configMapList = await Client.saeClient.listNamespacedConfigMaps(id);
    // const configMapListString = _.map(configMapList, item => ({
    //   ...item,
    //   Data: JSON.stringify(item.Data)
    // }))
    // tableShow(configMapListString, ['Name', 'ConfigMapId', 'CreateTime', 'UpdateTime', 'Data']);
    return configMapList;
  }

}
