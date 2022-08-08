import fse from 'fs-extra';
const path = require('path');

export interface Resource {
    type: 'sae',
    sae: {
        type: string;
        appId: string;
        appName: string;
        namespaceId?: string;
        region: string;
        oss?: any;
        slb: any;
    }
}

export default class ResourceFile {
    static filePath: any;
    static async setFilePath(accountID: string, region: string, appName: string) {
        const sPath = process.cwd();
        const dirPath = path.join(sPath, '.s', 'fc-cache');
        const fileName = accountID + '_' + region + '_' + appName + '_create_resources.json';
        const filepath = path.join(dirPath, fileName);
        this.checkDirExist(dirPath);
        this.filePath = filepath;
    }
    /**
     * 路径是否存在，不存在则创建
     * @param {string} dir 路径
     */
    static async checkDirExist(folderpath) {
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


    static async putResources(sae: any) {
        const res = {
            type:'sae',
            sae: sae,
        }
        await fse.outputFile(this.filePath, JSON.stringify(res, null, 2));
    }

    static async removeResources() {
        fse.unlink(this.filePath, function (err) {
            if (err) throw err;
        });
    }

    static async appendResource(name: string, value: any) {
        let cache: any = {};
        try {
            cache = fse.readJsonSync(this.filePath);
        } catch (_e) {
            /**/
        }
        cache['sae'][name] = value;
        await fse.outputFile(this.filePath, JSON.stringify(cache, null, 2));
    }

}
