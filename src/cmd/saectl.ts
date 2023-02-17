import { ICredentials } from "../interface/entity";
import * as core from '@serverless-devs/core';
import { InputProps } from '../interface/entity';

import { spawnSync } from 'child_process';
const { lodash } = core;

export class SaeCtlCmd {
    args: string
    credentials: ICredentials
    target: string
    region: string

    constructor(inputs: InputProps, credentials: ICredentials, target: string) {
        const { args, props: { region } } = inputs;
        this.region = region;
        this.credentials = credentials;
        this.args = args;
        this.target = target;
    }

    run() {
        let ak = this.credentials.AccessKeyID;
        let sk = this.credentials.AccessKeySecret;
        let cmd = `${this.target} ${this.args} --access-key-id ${ak}  --access-key-secret ${sk}`;
        if (!lodash.isEmpty(this.region)) {
            cmd = `${this.target} ${this.args} --access-key-id ${ak}  --access-key-secret ${sk} --region ${this.region}`
        }
        spawnSync(cmd, { shell: true, stdio: 'inherit' });
    }
}