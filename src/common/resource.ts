import fse from 'fs-extra';
const path = require('path');

export interface Resource {
    type: string;
    appId?: string;
    appName?: string;
    namespaceId?: string;
    region: string;
    oss?: any;
    slb?: any;
}
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function checkDirExist(folderpath) {
    const pathArr = folderpath.split('/');
    let _path = '';
    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i]) {
            _path += `/${pathArr[i]}`;
            if (!fse.existsSync(_path)) {
                fse.mkdirSync(_path);
            }
        }
    }
}


export async function putResources(accountID: string, resource: Resource) {
    const sPath = process.cwd();
    const dirPath = path.join(sPath, '.s', 'fc-cache');
    const fileName = accountID + '_' + resource.region + '_' + resource.appName + '_create_resources.json';
    const filepath = path.join(dirPath, fileName);
    checkDirExist(dirPath);
    await fse.outputFile(filepath, JSON.stringify(resource, null, 2));
}

export async function removeResources(accountID: string, region: string, appName: string) {
    const sPath = process.cwd();
    const dirPath = path.join(sPath, '.s', 'fc-cache');
    const fileName = accountID + '_' + region + '_' + appName + '_create_resources.json';
    const filepath = path.join(dirPath, fileName);
    fse.unlink(filepath, function (err) {
        if (err) throw err;
    });
}