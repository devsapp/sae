import OssClient from 'ali-oss';
import { spinner, lodash, CatchableError } from '@serverless-devs/core';
import { IOssConfig, IUpload } from '../interface/oss';
import { ICredentials } from '../interface/entity';
import logger from '../common/logger';
import { writeCreatCache } from '../common/cache';

const getAutoName = (region, accountId) => `sae-packages-${region}-${accountId}`;

export default class Oss {
	static getBucketName(bucketName: any, region: any, accountId: any) {
		if (lodash.isEmpty(bucketName)) {
			throw new CatchableError('bucket 需要填写');
		}
		if (lodash.isEqual(bucketName, 'auto')) {
			return getAutoName(region, accountId);
		}
		return bucketName;
	}

	ossClient: OssClient;
	bucket: string;
	region: string;
	private credentials: ICredentials;

	constructor(ossConfig: IOssConfig) {
		const { bucket, region, credentials } = ossConfig;
		this.ossClient = new OssClient({ // 构造oss客户端
			bucket: bucket,
			region: `oss-${region}`,
			accessKeyId: credentials?.AccessKeyID,
			accessKeySecret: credentials?.AccessKeySecret,
			stsToken: credentials?.SecurityToken,
		});
		this.bucket = bucket;
		this.region = region;
		this.credentials = credentials;
	}

	async deleteFile(filename: string) {
		try {
			await this.ossClient.delete(filename);
		} catch (e) {
			logger.error(e.toString());
		}
	}

	async upload({ file, object, type }: IUpload, cachePayload) {
		if (type === 'upload') {
			// bucket, 不存在此bucket,则创建: 并且加上权限
			await this.getOrCreateBucket(this.bucket, cachePayload);
			// 文件上传
			await this.put(file, object);
			return;
		}

		try {
			// 文件权限更新
			await this.setPrivate(object);
		} catch (_e) { }
	}

	private async setPrivate(object: string) {
		await this.ossClient.putACL(object, 'private')
	}

	private async put(file: string, object: string) {
		await this.ossClient.put(`${object}`, file);
		await this.ossClient.putACL(`${object}`, 'public-read')
	}

	private async getOrCreateBucket(bucket, cachePayload) {
		try {
			await this.ossClient.getBucketInfo(bucket);
			return;
		} catch (error) {
			if (!lodash.isEqual(error?.code, 'NoSuchBucket')) {
				throw new Error(error.message);
			}
			const autoName = getAutoName(this.region, this.credentials.AccountID);
			if (!lodash.isEqual(autoName, bucket)) {
				throw new Error(error.message);
			}
		}

		const vm = spinner(`Create ${bucket} bucket`);
		try {
			await this.ossClient.putBucket(bucket);
			
			if (cachePayload?.appName) {
				await writeCreatCache(
					{
						region: this.region,
						appName: cachePayload?.appName,
						accountID: this.credentials.AccountID,
						configPath: cachePayload?.configPath,
					},
					{ bucketName: bucket },
				);
			}

			// region重新赋值
			const location = await this.ossClient.getBucketLocation(bucket);
			this.ossClient = new OssClient({
				bucket,
				region: location.location,
				accessKeyId: this.credentials?.AccessKeyID,
				accessKeySecret: this.credentials?.AccessKeySecret,
				stsToken: this.credentials?.SecurityToken,
			});
		} catch (ex) {
			vm.fail();
			throw new Error(ex);
		}
		vm.succeed();
	}
}
