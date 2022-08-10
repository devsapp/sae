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
export declare function writeCreatCache({ accountID, region, appName, configPath }: IStatePayload, { bucketName, appId }: IPayload): any;
export {};
