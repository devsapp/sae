import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    test(inputs: InputProps): Promise<{
        hello: string;
    }>;
    create(inputs: InputProps): Promise<any>;
}
