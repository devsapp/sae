import { InputProps } from './common/entity';
export default class SaeComponent {
    isHelp(args: string, argsObj?: any): any;
    info(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    deploy(inputs: InputProps): Promise<import("./common/entity").OutputProps>;
    remove(inputs: InputProps): Promise<void>;
}
