import { InputProps } from './common/entity';
export default class SaeComponent {
    info(inputs: InputProps): Promise<any>;
    deploy(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
}
