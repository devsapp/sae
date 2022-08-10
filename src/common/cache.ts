import { loadComponent, getState, setState } from '@serverless-devs/core';
import path from 'path';
import logger from './logger';

interface IStatePayload {
  accountID: string;
  region: string;
  appName: string;
  configPath: string;
}

interface IPayload {
  appId?: string;
  bucketName?: string;
}

/**
 * 写创建资源的缓存
 */
export async function writeCreatCache(
  { accountID, region, appName, configPath }: IStatePayload,
  { bucketName, appId }: IPayload
) {
  try {
    const fcCore = await loadComponent('devsapp/fc-core');
    const stateId = await fcCore.DeployCache.getCreateResourceStateID(accountID, region, appName);
    const cachePath = path.join(configPath ? path.dirname(configPath) : process.cwd(), '.s');

    const cacheData = (await getState(stateId, cachePath)) || {};
    if (bucketName) {
      cacheData.sae_namespaceId = bucketName;
    }
    if (appId) {
      cacheData.sae_appId = appId;
    }
    await setState(stateId, cacheData, cachePath);
  } catch (ex) {
    /* 不影响主进程 */
    logger.debug(ex);
  }
}