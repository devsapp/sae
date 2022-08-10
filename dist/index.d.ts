import { InputProps } from './common/entity';
export default class SaeComponent {
    start(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    stop(inputs: InputProps): Promise<void>;
    info(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    deploy(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    remove(inputs: InputProps): Promise<void>;
}
