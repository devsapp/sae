import * as core from '@serverless-devs/core';
import Client from '../client';
import logger from '../../common/logger';
import _ from 'lodash';
import { diffArray, objValueBaseDecode } from '../utils';
import { Base64 } from 'js-base64';

// @ts-ignore

const SECRET_COMMAND: string[] = ['list', 'create', 'delete', 'update', 'info', 'deploy'];

export default class Secret {
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
    const { secret } = props;
    const secretList = await this.list(inputs);

    const { createQueue, updateQueue } = diffArray(secret, secretList, 'name', 'SecretName', 'SecretId');

    await Promise.all(_.map([...createQueue, ...updateQueue], async (item) => {
      if (item.id) {
        await this.update(inputs, item)
      } else {
        await this.create(inputs, item)
      }
    }))

    return await this.list(inputs);
  }

  async create(inputs, secret) {
    const { props } = inputs;
    const { region, id } = props;
    const { name, data, type } = secret;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const secretData = this.getSecretData(type, data)

    try {
      await Client.saeClient.createSecret(id, name, secretData, type);
    } catch (error) {
      logger.error(`${error}`);
    }
  }

  async update(inputs, secret) {
    const { props } = inputs;
    const { region, id } = props;
    const {id: secretId, type, data } = secret;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const secretData = this.getSecretData(type, data)

    try {
      await Client.saeClient.updateSecret(id, secretId, secretData);
    } catch (error) {
      logger.error(`${error}`);
    }
  }

  async delete(inputs) {
    const { args, props } = inputs;
    const { region, id } = props;
    const argsArr = args.split(' ');
    const secretId = argsArr[1];

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    await Client.saeClient.deleteSecret(id, secretId);
  }

  async list(inputs: any) {
    const { props } = inputs;
    const { region, id } = props;
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const secretList = await Client.saeClient.listSecrets(id);
    
    //tableShow(secretList, ['SecretName', 'SecretId', 'SecretType', 'CreateTime', 'UpdateTime']);
    return secretList;
  }

  async info(inputs) {
    const { args, props } = inputs;
    const { region, id } = props;
    const argsArr = args.split(' ');
    const secretId = argsArr[1];
    
    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const secretInfo = await Client.saeClient.describeSecrets(id, secretId);
    
    const { SecretData, SecretType } = secretInfo;
    secretInfo.SecretData = SecretType === 'kubernetes.io/dockerconfigjson' ? this.parseK8sDockerJson(SecretData) : objValueBaseDecode(SecretData)
    return secretInfo;
  }

  parseK8sDockerJson(data: Object) {
    const dockerConfig = data['.dockerconfigjson'];
    const dockerObjStr = Base64.decode(dockerConfig);
    const dockerObj = JSON.parse(dockerObjStr)
    const { auths } = dockerObj;
    const [domain] = Object.keys(auths);
    const userPass = Base64.decode(auths[domain]['auth']);
    const [username, password] = userPass.split(':');

    return {
      domain,
      username,
      password,
    }
  }
  
  getSecretData(secretType: string, secretData: any) {
    const {
      domain = '',
      username = '',
      password = '',
      cert = '',
      key = '',
    } = secretData;

    let result = {};
    
    switch (secretType) {
      case 'Opaque':
        _.forEach(secretData, (value, key) => {
          result[key] = Base64.encode(value)
        })
        
        break;
      case 'kubernetes.io/dockerconfigjson':
        const domainArr = [];
        const registryDomainReg = /^(\S)*registry(-vpc)?\.(\S)+\.aliyuncs.com(\S)*$/;
        if (registryDomainReg.test(domain)) {
          const registryVpcReg = /registry(-vpc)?.*?(?=(\S)+.aliyuncs.com)/
          const domainFull = _.replace(domain, registryVpcReg, 'registry-vpc');
          const domainShort = _.replace(domain, registryVpcReg, 'registry');
          domainArr.push(domainFull, domainShort);
        } else {
          domainArr.push(domain);
        }
        const value = {
          auths: {}
        }
        const domainObj = {
          username,
          password,
          auth: Base64.encode(`${username}:${password}`)
        }

        _.forEach(domainArr, (item) => {
          value['auths'][item] = domainObj;
        })

        result = {
          '.dockerconfigjson': Base64.encode(JSON.stringify(value)),
        }
        break;
      case 'kubernetes.io/tls':
        result = {
          'tls.crt': cert,
          'tls.key': key,
        }
        break;
      default:
        break;
    }

    return result;
  }

}
