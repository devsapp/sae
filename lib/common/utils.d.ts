import { InputProps, OutputProps } from './entity';
export declare function deleteOssFile(region: any, application: any, credentials: any): Promise<number>;
export declare function checkStatus(appId: any, coType: any): Promise<void>;
export declare function getStatusByOrderId(orderId: any): Promise<void>;
export declare function infoRes(application: any): Promise<OutputProps>;
export declare function output(applicationObject: any, slbConfig: any): Promise<OutputProps>;
export declare function handleEnv(inputs: InputProps, application: any, credentials: any): Promise<{
    namespace: any;
    slb: any;
}>;
export declare function handleCode(region: any, application: any, credentials: any): Promise<any>;
export declare function setDefault(applicationObject: any): Promise<void>;
