import { Base64 } from 'js-base64';
import * as core from '@serverless-devs/core';
const { lodash: _ } = core;

export function objValueBaseEncode(data: any) {
    const obj = {};
    _.forEach(data, (value, key) => {
        obj[key] = Base64.encode(value);
    })
    return obj;
};

export function objValueBaseDecode(data: any) {
    const obj = {};
    _.forEach(data, (value, key) => {
        obj[key] = Base64.decode(value);
    })
    return obj;
};

export function diffArray(localList: Array<any>, remoteList: Array<any>, localName: string, remoteName: string, remoteId: string) {
    const createQueue = [];
    const updateQueue = [];

    _.forEach(localList, local => {
        const remoteConfig = _.find(remoteList, remote => remote[remoteName] === local[localName])
        if (!remoteConfig) {
            createQueue.push(local);
        } else {
            local.id = remoteConfig[remoteId]
            updateQueue.push(local);
        }
    })

    return { createQueue, updateQueue }
}