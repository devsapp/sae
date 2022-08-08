export interface Resource {
    type: string;
    appId?: string;
    appName?: string;
    namespaceId?: string;
    region: string;
    oss?: any;
    slb?: any;
}
export default class ResourceFile {
    static filePath: any;
    static setFilePath(accountID: string, region: string, appName: string): Promise<void>;
    /**
     * 路径是否存在，不存在则创建
     * @param {string} dir 路径
     */
    static checkDirExist(folderpath: any): Promise<void>;
    static putResources(resource: Resource): Promise<void>;
    static removeResources(): Promise<void>;
    static appendResource(name: string, value: any): Promise<void>;
}
