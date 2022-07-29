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
    namespace: {
        id: string;
        name: string;
    };
    vpcConfig: {
        vpcId: string;
        vSwitchId: string;
        securityGroupId: string;
    };
    application: {
        id: string;
        name: string;
        console: string;
        packageType: string;
        imageUrl?: string;
        packageUrl?: string;
        cpu: number;
        memory: number;
        replicas: number;
    };
    slb: {
        InternetIp?: string;
        IntranetSlbId?: string;
    };
}
