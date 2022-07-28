import { InputProps } from './common/entity';
export default class SaeComponent {
    info(inputs: InputProps): Promise<void>;
    deploy(inputs: InputProps): Promise<{
        namespace: any;
        application: {
            appId: any;
            name: any;
        };
        Console: string;
    }>;
}
