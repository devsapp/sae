import { InputProps } from './interface/entity';
import logger from './common/logger';
import ConfigMap from './lib/component/configMap';
import Secret from './lib/component/secret';
import Router from './lib/component/router';
import Namespace from './lib/component/namespace';

export default class ComponentDemo {
  async deploy(inputs: InputProps) {

    const namespace = new Namespace();
    const configMap = new ConfigMap();
    const secret = new Secret();
    const router = new Router();

    let namespaceRes = {}
    let configMapRes = {}
    let secretRes = {}
    let routerRes = {};

    await logger.task('部署namespace', [
      {
        title: '部署命名空间...',
        task: async () => {
          namespaceRes = await namespace['deploy'](inputs);
        },
      },
      {
        title: '部署configMap...',
        task: async () => {
          configMapRes = await configMap['deploy'](inputs);
        },
      },
      {
        title: '部署secret...',
        task: async () => {
          secretRes = await secret['deploy'](inputs);
        },
      },
      {
        title: '部署router...',
        task: async () => {
          routerRes = await router['deploy'](inputs);
        },
      },
    ]);

    return { 
      namespace: namespaceRes,
      configMap: configMapRes,
      secret: secretRes,
      router: routerRes 
    };
  }

  async configMap(inputs: InputProps): Promise<any> {
    const {subCommand} = await ConfigMap.handlerInputs(inputs);
  
    const qualifier = new ConfigMap();
    return await qualifier[subCommand](inputs);
  }

  async secret(inputs: InputProps): Promise<any> {
    const {subCommand} = await Secret.handlerInputs(inputs);

    const qualifier = new Secret();
    return await qualifier[subCommand](inputs);
  }

  async router(inputs: InputProps): Promise<any> {
    const {subCommand} = await Router.handlerInputs(inputs);

    const qualifier = new Router();
    return await qualifier[subCommand](inputs);
  }
}
