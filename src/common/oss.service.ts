import OssClient from 'ali-oss';
import { spinner } from '@serverless-devs/core';

export interface IOssConfig {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    bucket: string;
    region: string;
    file: string;
    object: string;
    type: string;
}

export default async (ossConfig: IOssConfig) => {
    const { bucket, file, object , type} = ossConfig;
    // 构造oss客户端
    let ossClient = new OssClient({
        bucket: ossConfig?.bucket,
        region: `oss-${ossConfig?.region}`,
        accessKeyId: ossConfig?.accessKeyId,
        accessKeySecret: ossConfig?.accessKeySecret,
        securityToken: ossConfig?.securityToken,
    });

    if(type == 'upload'){
        // bucket, 不存在此bucket,则创建: 并且加上权限
        await getOrCreateBucket(ossClient, bucket);
        // region重新赋值
        const location = await ossClient.getBucketLocation(bucket);
        ossClient = new OssClient({
            bucket,
            region: location.location,
            accessKeyId: ossConfig?.accessKeyId,
            accessKeySecret: ossConfig?.accessKeySecret,
            securityToken: ossConfig?.securityToken,
        });
        // 文件上传
        await put(ossClient, file, object);
    }else{
        try {
            // 文件权限更新
            await setPrivate(ossClient, file, object);
        }catch (e){}
    }
};


async function put(ossClient: OssClient, file: string, object: string) {
    await ossClient.put(`${object}`, file);
    await ossClient.putACL(`${object}`, 'public-read')
}

async function setPrivate(ossClient: OssClient, file: string, object: string) {
    await ossClient.putACL(`${object}`, 'private')
}

async function getOrCreateBucket(ossClient: OssClient, bucket: string) {
    try {
        await ossClient.getBucketInfo(bucket);
    } catch (error) {
        if (error.code == 'NoSuchBucket') {
            const vm = spinner(`Create ${bucket} bucket`);
            await ossClient.putBucket(bucket);
            vm.succeed();
        } else {
            throw new Error(error.message);
        }
    }
}
