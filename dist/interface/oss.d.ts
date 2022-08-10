import { ICredentials } from './entity';
export interface IOssConfig {
    credentials: ICredentials;
    region: string;
    bucket: string;
}
export interface IUpload {
    file: string;
    object: string;
    type: string;
}
