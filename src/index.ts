// import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';

export default class SaeComponent {
  async deploy(inputs: InputProps) {
    console.log(inputs);
    return 'deploy';
  }
}
