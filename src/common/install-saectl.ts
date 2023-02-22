import { existsSync } from "fs";
import * as core from '@serverless-devs/core';
const { spinner } = core;
import logger from '../common/logger';
import { spawnSync } from 'child_process';
import os from 'os';
import fetch from 'node-fetch';

const osMap = new Map([
    ["Linux", "linux"],
    ["Darwin", "darwin"],
    ["Windows_NT", "windows"]
]);
const archMap = new Map([
    ["arm", "arm64"],
    ["arm64", "arm64"],
    ["x64", "amd64"]
]);
const fs = require('fs');

const BASE_DOWNLOAD_URL = "https://sae-component-software.oss-cn-hangzhou.aliyuncs.com/saectl"
const HOME_DIR = os.homedir();
const SAECTL_INSTALLED_PATH = `${HOME_DIR}/.s/components/devsapp.cn/sae/dist`;
const DEVSAPP_SAECTL_INSTALLED_PATH = `${HOME_DIR}/.s/components/devsapp.cn/devsapp/sae/dist`;
let INSTALLED_PATH;

export async function checkAndInstallSaeCtl() {
    let os_arch = getMachineOsArch();
    if (existsSync(DEVSAPP_SAECTL_INSTALLED_PATH)) {
        INSTALLED_PATH = DEVSAPP_SAECTL_INSTALLED_PATH
    } else {
        INSTALLED_PATH = SAECTL_INSTALLED_PATH
    }
    let target = `${INSTALLED_PATH}/${os_arch}/saectl`;
    let exist = existsSync(target);
    if (!exist) {
        let target = await installSaeCtl("latest");
        return target;
    }
    return target;
}

function getMachineOsArch() {
    if (!osMap.has(os.type()) || !archMap.get(os.arch())) {
        logger.error(`not support os-arch: ${os.type()}-${os.arch()}`)
        process.exit(1);
    }
    let targetOs = osMap.get(os.type());
    let targetArch = archMap.get(os.arch());
    return `${targetOs}-${targetArch}`
}

export async function installSaeCtl(version: string) {
    let os_arch = getMachineOsArch();
    let tarFileName = `saectl-${version}-${os_arch}.tar.gz`;
    let downloadUrl = `${BASE_DOWNLOAD_URL}/${version}/${tarFileName}`;
    let downloadFileName = `${INSTALLED_PATH}/${tarFileName}`;
    let exist = existsSync(downloadFileName);
    if (!exist) {
        let downloadProgress = spinner("Download saectl plugin");
        try {
            let resp = await fetch(downloadUrl);
            let buffer = await resp.buffer();
            fs.writeFileSync(downloadFileName, buffer)
        } catch (ex) {
            downloadProgress.fail();
            logger.error(`fail to download ${downloadUrl}, err: ${ex}`)
            process.exit(1);
        }
        downloadProgress.succeed();
    }
    try {
        spawnSync(`tar xf ${downloadFileName} -C ${INSTALLED_PATH}`, { shell: true, stdio: 'inherit' });
    } catch (ex) {
        logger.error(`fail to tar plugin ${downloadFileName}`)
        process.exit(1);
    }
    return `${INSTALLED_PATH}/${os_arch}/saectl`
}