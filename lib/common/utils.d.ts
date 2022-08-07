import { InputProps, OutputProps } from './entity';
/**
 * 判断是否需要重新绑定slb
 * @param slb 本地slb
 * @param appId appid
 */
export declare function needBindSlb(slb: any, appId: string): Promise<boolean>;
export declare function deleteFile(credentials: any, bucket: any, fileName: string): Promise<void>;
export declare function file2delete(region: any, application: any, credentials: any): Promise<{
    fileName?: undefined;
    bucket?: undefined;
    fileAddr?: undefined;
} | {
    fileName: string;
    bucket: any;
    fileAddr: string;
}>;
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
export declare function parseCommand(args: string): Promise<{
    isHelp?: undefined;
    useLocal?: undefined;
    useRemote?: undefined;
} | {
    isHelp: any;
    useLocal: any;
    useRemote: any;
}>;
export declare function handlerInfoInputs(args: string): Promise<{
    isHelp?: undefined;
    outputFile?: undefined;
} | {
    isHelp: any;
    outputFile: any;
}>;
export declare function handlerRmInputs(args: string): Promise<{
    isHelp?: undefined;
    assumeYes?: undefined;
} | {
    isHelp: any;
    assumeYes: any;
}>;
export declare function promptForConfirmOrDetails(message: string): Promise<boolean>;
export declare function removePlan(application: any, file: any): Promise<"assumeYes" | "quit">;
