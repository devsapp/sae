import OssClient from 'ali-oss';
import { IOssConfig, IUpload } from '../interface/oss';
export default class Oss {
    static getBucketName(bucketName: any, region: any, accountId: any): any;
    ossClient: OssClient;
    bucket: string;
    region: string;
    private credentials;
    constructor(ossConfig: IOssConfig);
    deleteFile(filename: string): Promise<void>;
    upload({ file, object, type }: IUpload, cachePayload: any): Promise<void>;
    private setPrivate;
    private put;
    private getOrCreateBucket;
}
