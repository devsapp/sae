export interface ICredentials {
    AccountID: string;
    AccessKeyID: string;
    AccessKeySecret: string;
    SecurityToken?: string;
}
export interface InputProps {
    props: any;
    credentials: ICredentials;
    appName: string;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    command: string;
    args: string;
    path: {
        configPath: string;
    };
}
export interface OutputProps {
    componentType?: string;
    accessLink?: string;
    console: string;
    application: {
        region?: string;
        namespaceId?: string;
        namespaceName?: string;
        vpcId?: string;
        vSwitchId?: string;
        securityGroupId?: string;
        appId?: string;
        appName: string;
        packageType?: string;
        imageUrl?: string;
        packageUrl?: string;
        cpu?: number;
        memory?: number;
        replicas?: number;
        scaleRuleEnabled?: any;
        instances?: number;
        appDescription?: string;
        runningInstances?: number;
        appDeletingStatus?: any;
    };
    slb: {
        InternetIp?: string;
        InternetPort?: string;
        IntranetIp?: string;
        IntranetPort?: string;
    };
}
