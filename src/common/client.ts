// @ts-ignore
import { ROAClient } from '@alicloud/pop-core';
const Core = require('@alicloud/pop-core');

export async function vpcAvailable(vpcId, region, credentials) {

    var client = new Core({
        accessKeyId: credentials?.AccessKeyID,
        accessKeySecret: credentials?.AccessKeySecret,
        securityToken: credentials?.SecurityToken,
        endpoint: 'https://vpc.aliyuncs.com',
        apiVersion: '2016-04-28'
    });

    var params = {
        "RegionId": region,
        "VpcId": vpcId
    }

    var requestOption = {
        method: 'POST',
        formatParams: false,

    };
    let data = await client.request('DescribeVpcs', params, requestOption);
    if (data['TotalCount'] != 1) {
        return false;
    }
    if (data['Vpcs']['Vpc'][0]['Status'] != 'Available') {
        return false;
    }
    return true;
}

export default class Client {
    static saeClient: any;

    static async setSaeClient(region, credentials) {
        const saeClient = new ROAClient({
            accessKeyId: credentials?.AccessKeyID,
            accessKeySecret: credentials?.AccessKeySecret,
            securityToken: credentials?.SecurityToken,
            endpoint: `https://sae.${region}.aliyuncs.com`,
            apiVersion: "2019-05-06",
        });

        const body = `{}`;
        const headers = {
            "Content-Type": "application/json",
        };
        const requestOption = {
            timeout: 60000,
        };
        const ListChangeOrdersUri = '/pop/v1/sam/changeorder/ListChangeOrders';
        const NamespaceUri = '/pop/v1/paas/namespace';
        const DescribeNamespaceListUri = '/pop/v1/sam/namespace/describeNamespaceList';
        const UpdateNamespaceVpcUri = '/pop/v1/sam/namespace/updateNamespaceVpc';
        const CreateApplicationUri = '/pop/v1/sam/app/createApplication';
        const ListApplicationsUri = '/pop/v1/sam/app/listApplications';
        const DeployApplicationUri = '/pop/v1/sam/app/deployApplication';
        const DeleteApplicationUri = '/pop/v1/sam/app/deleteApplication';
        const BindSLBUri = "/pop/v1/sam/app/slb";
        const GETSLBUri = '/pop/v1/sam/app/slb';
        const DescribeChangeOrderUri = '/pop/v1/sam/changeorder/DescribeChangeOrder';
        const DescribeApplicationConfigUri = '/pop/v1/sam/app/describeApplicationConfig';
        
        /**
         * 获取应用配置信息
         * @param appId id
         */
        saeClient.describeApplicationConfig = async function (appId: any) {
            let queries = {
                AppId: appId
            };
            let data = await saeClient.request("GET", DescribeApplicationConfigUri, queries, body, headers, requestOption);
            return data;
        }
        
        /**
         * 获取变更单列表
         * @param appId 应用ID
         * @param coType 变更单类型
         * @returns 变更单列表信息
         */
        saeClient.listChangeOrders = async function (appId: any, coType: any) {
            let queries = {
                AppId: appId, CoType: coType, CurrentPage: 1, PageSize: 10,
            };
            let data = await saeClient.request("GET", ListChangeOrdersUri, queries, body, headers, requestOption);
            return data;
        }

        /**
         * 查询变更单信息
         * @param orderId id
         * @returns 
         */
        saeClient.describeChangeOrder = async function (orderId:any) {
            let queries = {
                ChangeOrderId: orderId,
            };
            let data = await saeClient.request("GET", DescribeChangeOrderUri, queries, body, headers, requestOption);
            return data;
        }
        /**
         * 创建命名空间
         * @param Namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.createNamespace = async function (namespace: any) {
            let queries = {
                NamespaceId: namespace.id,
                NamespaceName: namespace.name,
                NamespaceDescription: namespace.description,
            };
            let data = await saeClient.request("POST", NamespaceUri, queries, body, headers, requestOption);
            return data;
        }

        /**
         * 更新命名空间
         * @param namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.updateNamespace = async function (namespace: any) {
            let queries = {
                NamespaceId: namespace.id,
                NamespaceName: namespace.name,
                NamespaceDescription: namespace.description,
            };
            let data = await saeClient.request("PUT", NamespaceUri, queries, body, headers, requestOption);
            return data;
        }

        saeClient.getNamespace = async function () {
            let queries = {};
            let obj = await saeClient.request("GET", DescribeNamespaceListUri, queries, body, headers, requestOption);
            let data = obj['Data'][0];
            return data;
        }

        saeClient.updateNamespaceVpc = async function (namespaceId: string, vpcId: string) {
            let queries = { NamespaceId: namespaceId, VpcId: vpcId };
            let data = await saeClient.request("POST", UpdateNamespaceVpcUri, queries, body, headers, requestOption);
            return data
        }
        /*
         * 创建一个应用
         * @param applicationObject 应用信息
         * @returns 创建结果
         */
        saeClient.createApplication = async function (applicationObject: any) {
            let data = await saeClient.request("POST", CreateApplicationUri, applicationObject, body, headers, requestOption);
            return data;
        }

        /**
         * 获取应用列表
         * @param appName 应用名称
         * @returns 应用列表
         */
        saeClient.listApplications = async function (appName: any) {
            let queries = {
                FieldType: 'appName', FieldValue: appName
            };
            let data = await saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption);
            return data;
        }

        /**
         * 部署应用
         * @param applicationObject 应用信息
         * @returns 部署结果
         */
        saeClient.deployApplication = async function (applicationObject: any) {
            let data = await saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption);
            return data;
        }

        /**
         * 根据id删除应用
         * @param appId id
         */
        saeClient.deleteApplication = async function (appId: any) {
            let queries = {
                "AppId": appId
            };
            const data = await saeClient.request("DELETE", DeleteApplicationUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        /**
         * 绑定SLB
         * @param SLB SLB信息
         * @returns 绑定结果
         */
        saeClient.bindSLB = async function (slb: any, appId: any) {
            if (slb.Internet && typeof slb.Internet == 'object') {
                slb.Internet = JSON.stringify(slb.Internet)
            }
            if (slb.Intranet && typeof slb.Intranet == 'object') {
                slb.Intranet = JSON.stringify(slb.Intranet)
            }
            if (appId) {
                slb.AppId = appId;
            }
            const data = await saeClient.request("POST", BindSLBUri, slb, body, headers, requestOption);
            return data['Data']['ChangeOrderId'];
        }

        /**
         * 获取SLB信息
         * @param appId 
         * @returns 
         */
        saeClient.getSLB = async function (appId: any) {
            let data = await saeClient.request("GET", GETSLBUri, { AppId: appId }, body, headers, requestOption);
            return data;
        }

        /**
         * 更新已存在的应用
         * @param applicationObject 
         */
        saeClient.updateApplication = async function (applicationObject: any) {
            let queries = {
                FieldType: 'appName', FieldValue: applicationObject.AppName
            };
            let data = await saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption);
            let appId = data['Data']['Applications'][0]['AppId'];
            applicationObject.AppId = appId;
            const res = await saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption);
            return res;
        }

        this.saeClient = saeClient;
        return saeClient;
    }
}