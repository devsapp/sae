import { Base64 } from 'js-base64';
import Table from 'tty-table';
import _ from 'lodash';

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

export const tableShow = (data, showKey) => {
    const options = {
      borderStyle: 'solid',
      borderColor: 'white',
      headerAlign: 'center',
      align: 'left',
      color: 'white',
      width: '100%',
    };
    const header_option = {
      headerColor: 'white',
      color: 'white',
      align: 'left',
      width: 'auto',
      formatter: (value) => value,
    };
    const header = showKey.map((value) =>
      (_.isString(value)
        ? {
          ...header_option,
          value,
        }
        : { ...header_option, ...value }));
  
    console.log(Table(header, data, options).render());
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