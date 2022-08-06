export interface ICredentials {
    AccountID?: string;
    AccessKeyID?: string;
    AccessKeySecret?: string;
    SecretID?: string;
    SecretKey?: string;
    SecretAccessKey?: string;
    KeyVaultName?: string;
    TenantID?: string;
    ClientID?: string;
    ClientSecret?: string;
    PrivateKeyData?: string;
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
    accessLink?: string;
    console: string;
    namespace: {
        id: string;
        name?: string;
    };
    vpcConfig: {
        vpcId?: string;
        vSwitchId?: string;
        securityGroupId?: string;
    };
    application: {
        id?: string;
        name: string;
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
