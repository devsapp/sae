export interface IOssConfig {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    bucket: string;
    region: string;
    file: string;
    object: string;
    type: string;
}
declare const _default: (ossConfig: IOssConfig) => Promise<void>;
export default _default;
