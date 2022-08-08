import { InputProps } from './common/entity';
export default class SaeComponent {
    info(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    deploy(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    remove(inputs: InputProps): Promise<void>;
}
