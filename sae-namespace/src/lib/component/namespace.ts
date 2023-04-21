import * as core from '@serverless-devs/core';
import { spinner } from "@serverless-devs/core";
import Client from '../client';
import logger from '../../common/logger';

export default class Namespace {
  async deploy(inputs) {
    const { props } = inputs;
    const { region, id, name = 'auto', description, vpcConfig } = props;

    const credentials = await core.getCredential(inputs.project.access);
    await Client.setSaeClient(region, credentials);

    const namespaceData = await Client.saeClient.describeNamespaceResources(id);

    if (namespaceData.Data) {

      const vm = spinner('更新命名空间信息...');

      try {
        const res = await Client.saeClient.updateNamespace({
          id,
          name,
          description,
        })

        if (res.Code === 200) {
          vm.stop();
        }
      } catch (error) {
        vm.stop();
        logger.error(`${error}`);
        return;
      }

      if (vpcConfig && vpcConfig !== 'auto' && (vpcConfig?.vpcId !== namespaceData.Data.VpcId)) {
        const vm = spinner('更新命名空间VPC...');
        try {
          const { vpcId } = vpcConfig;
          const res = await Client.saeClient.updateNamespaceVpc(id, vpcId)

          if (res.Code === 200) {
            vm.stop();
          }
        } catch (error) {
          vm.stop();
          logger.error(`${error}`);
          return;
        }
      }

    } else {
      const vm = spinner('创建命名空间...');
      try {
        const res = await Client.saeClient.createNamespace({
          name,
          id,
          description,
        })

        if (res.Data.NamespaceId) {
          logger.success('命名空间创建成功')
          vm.stop();
        }
      } catch (error) {
        vm.stop();
        logger.error(`${error}`);
        return;
      }
    }

    return namespaceData.Data;
  }

}
