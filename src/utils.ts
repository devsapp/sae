import oss, { IOssConfig } from './common/oss.service';
import fse from "fs";
import stringRandom from 'string-random';

export async function uploadFile(credentials, codePackage, object, type) {
    let bucket = codePackage.Bucket.Name;
    let region = codePackage.Bucket.Region;
    let file = codePackage.Path;
    const ossConfig: IOssConfig = {
        accessKeyId: credentials.AccessKeyID,
        accessKeySecret: credentials.AccessKeySecret,
        bucket: bucket,
        region: region,
        file: file,
        object: object,
        type: type,
    };
    await oss(ossConfig);
}


export async function handleCode(Region: any, Application: any, credentials:any) {
    let { AccountID } = credentials;

    let tempObject = stringRandom(16);
    const applictionObject = JSON.parse(JSON.stringify(Application));
    delete applictionObject.Code;

    // 对code进行处理
    const code = Application.Code ? Application.Code : {};
    const image = code.Image;
    let codePackage = code.Package;
    if (image) {
        applictionObject.PackageType = 'Image';
        applictionObject.ImageUrl = image;
    } else if (codePackage) {
        if (typeof codePackage == 'string') {
            codePackage = {
                Path: codePackage,
                Bucket: {
                    Region: Region,
                    Name: `sae-packages-${Region}-${AccountID}`
                }
            }
        } else {
            if (!codePackage.Path) {
                throw Error("未能找到iamge/package，请确定参数传递正确")
            }
            const codeBucket = codePackage.Bucket || {}
            codeBucket.Region = codeBucket.Region || Region
            codeBucket.Name = codeBucket.Name || `sae-packages-${Region}-${AccountID}`
            codePackage.Bucket = codeBucket
        }
        if (codePackage.Path.endsWith('.war') || codePackage.Path.endsWith('.jar')) {
            if (codePackage.Path.endsWith('.war')) {
                tempObject = tempObject + '.war';
                applictionObject.PackageType = 'War';
                applictionObject.WebContainer = 'apache-tomcat-8.5.42';
            } else if (codePackage.Path.endsWith('.jar')) {
                tempObject = tempObject + '.jar';
                applictionObject.PackageType = 'FatJar';
            }
            applictionObject.Jdk = 'Open JDK 8';
            if (await fse.existsSync(codePackage.Path)) {
                await uploadFile(credentials, codePackage, tempObject, 'upload')
                applictionObject.PackageUrl = `https://${codePackage.Bucket.Name}.oss-${codePackage.Bucket.Region}.aliyuncs.com/${tempObject}`;
            } else if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                applictionObject.PackageUrl = codePackage.Path;
            } else {
                throw Error("未能成功文件，请确定package的路径正确")
            }
        } else {
            throw Error("未能找到package，请确定参数传递正确")
        }
    } else {
        throw Error("未能找到iamge/package，请确定参数传递正确")
    }
    return { applictionObject, codePackage, tempObject };
}