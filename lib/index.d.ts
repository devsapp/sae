import { InputProps } from './common/entity';
export default class SaeComponent {
    uploadFile(credentials: any, bucket: any, region: any, file: any, object: any, type: any): Promise<void>;
    checkStatus(AccessKeyID: any, AccessKeySecret: any, AppId: any, CoType: any, region: any): Promise<void>;
    deploy(inputs: InputProps): Promise<{
        Namespace: any;
        Application: {
            AppId: any;
            AppName: any;
        };
        Console: string;
    }>;
}
