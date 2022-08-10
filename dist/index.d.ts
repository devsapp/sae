import { InputProps } from './interface/entity';
export default class SaeComponent {
    start(inputs: InputProps): unknown;
    stop(inputs: InputProps): any;
    info(inputs: InputProps): unknown;
    deploy(inputs: InputProps): unknown;
    remove(inputs: InputProps): any;
}
