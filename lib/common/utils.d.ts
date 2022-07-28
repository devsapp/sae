import { InputProps } from './entity';
export declare function uploadFile(credentials: {
    AccessKeyID: any;
    AccessKeySecret: any;
}, codePackage: {
    bucket: {
        name: any;
        region: any;
    };
    path: any;
}, object: string, type: string): Promise<void>;
export declare function checkStatus(appId: any, coType: any): Promise<void>;
export declare function output(application: any, slbConfig: any): Promise<{
    namespace: any;
    application: {
        appId: any;
        name: any;
    };
    Console: string;
}>;
export declare function handleEnv(inputs: InputProps, application: any, credentials: any): Promise<{
    namespace: any;
    slb: any;
}>;
export declare function handleCode(region: any, application: any, credentials: any): Promise<any>;
export declare function setDefault(applictionObject: any): Promise<void>;
