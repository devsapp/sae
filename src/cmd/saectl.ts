import { ICredentials } from "../interface/entity";
import * as core from '@serverless-devs/core';
import { InputProps } from '../interface/entity';
import logger from '../common/logger';
import os from 'os';
import { spawn } from 'child_process';
const { lodash } = core;

export class SaeCtlCmd {
    args: string
    credentials: ICredentials
    target: string
    region: string

    osMap = new Map([
        ["Linux", "linux"],
        ["Darwin", "darwin"],
        ["Windows_NT", "windows"]
    ]);
    archMap = new Map([
        ["arm", "arm64"],
        ["arm64", "arm64"],
        ["x64", "amd64"]
    ]);

    constructor(inputs: InputProps, credentials: ICredentials) {
        const { args, props: { region } } = inputs;
        const comParse: any = core.commandParse({ args });
        const data = comParse?.data;
        let _region = data['region'];
        if (lodash.isEmpty(_region)) {
            this.region = region;
        }
        if (lodash.isEmpty(this.region) && lodash.isEmpty(_region)) {
            logger.error(`region can't be empty`)
            process.exit(1)
        }
        this.credentials = credentials;
        if (!this.osMap.has(os.type()) || !this.archMap.get(os.arch())) {
            logger.error(`not support os-arch: ${os.type()}-${os.arch()}`)
            process.exit(1)
        }
        this.args = args;
        this.target = `${__dirname}/dependence/${this.osMap.get(os.type())}-${this.archMap.get(os.arch())}/saectl`
    }

    async run() {
        let ak = this.credentials.AccessKeyID;
        let sk = this.credentials.AccessKeySecret;
        let cmd = `${this.target} ${this.args} --access-key-id ${ak}  --access-key-secret ${sk}`;
        if (!lodash.isEmpty(this.region)) {
            cmd = `${this.target} ${this.args} --access-key-id ${ak}  --access-key-secret ${sk} --region ${this.region}`
        }
        await spawn(cmd, { shell: true, stdio: 'inherit' });
    }
}