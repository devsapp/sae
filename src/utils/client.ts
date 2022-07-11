// @ts-ignore
import Pop, { ROAClient } from '@alicloud/pop-core';
import OssClient from 'ali-oss';
import { ICredentials } from '../common/entity';

export default class Client {
  credentials: ICredentials;
  timeout: string;
  constructor(credentials: ICredentials, timeout = '600000') {
    this.credentials = credentials;
    this.timeout = timeout; // 默认 10min
  }

  getOssClient(region, bucket) {
    return new OssClient({
      bucket,
      region: `oss-${region}`,
      timeout: this.timeout,
      accessKeyId: this.credentials?.AccessKeyID,
      accessKeySecret: this.credentials?.AccessKeySecret,
      stsToken: this.credentials?.SecurityToken,
    })
  }

  getSaeClient(region) {
    return new ROAClient({
      accessKeyId: this.credentials?.AccessKeyID,
      accessKeySecret: this.credentials?.AccessKeySecret,
      endpoint: `https://sae.${region}.aliyuncs.com`,
      apiVersion: "2019-05-06",
    });
  }

  getPopClient(endpoint, apiVersion,) {
    return new Pop({
      endpoint,
      apiVersion,
      accessKeyId: this.credentials.AccessKeyID,
      accessKeySecret: this.credentials.AccessKeySecret,
      // @ts-ignore: Set SecurityToken
      securityToken: this.credentials.SecurityToken,
      opts: {
        timeout: this.timeout,
      },
    });
  }
}
