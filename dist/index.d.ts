import { InputProps } from './interface/entity';
export default class SaeComponent {
    start(inputs: InputProps): Promise<import("./interface/entity").OutputProps>;
    stop(inputs: InputProps): Promise<void>;
    info(inputs: InputProps): Promise<import("./interface/entity").OutputProps>;
    deploy(inputs: InputProps): Promise<import("./interface/entity").OutputProps>;
    remove(inputs: InputProps): Promise<void>;
}
