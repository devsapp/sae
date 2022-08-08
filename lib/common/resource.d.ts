export interface Resource {
    type: string;
    appId?: string;
    appName?: string;
    namespaceId?: string;
    region: string;
    oss?: any;
    slb?: any;
}
export declare function putResources(accountID: string, resource: Resource): Promise<void>;
export declare function removeResources(accountID: string, region: string, appName: string): Promise<void>;
