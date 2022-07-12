// @ts-ignore
import { ROAClient } from '@alicloud/pop-core';


export default class Client {
    static saeClient: any;

    static async setSaeClient(region, accessKeyID, accessKeySecret) {
        const saeClient = new ROAClient({
            accessKeyId: accessKeyID,
            accessKeySecret: accessKeySecret,
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
        const DescribeNamespacesUri = '/pop/v1/paas/namespaces';
        const UpdateNamespaceVpc = '/pop/v1/sam/namespace/updateNamespaceVpc';
        const CreateApplicationUri = '/pop/v1/sam/app/createApplication';
        const ListApplicationsUri = '/pop/v1/sam/app/listApplications';
        const DeployApplicationUri = '/pop/v1/sam/app/deployApplication';
        const BindSLBUri = "/pop/v1/sam/app/slb";
        const GETSLBUri = '/pop/v1/sam/app/slb';

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
         * 创建命名空间
         * @param Namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.createNamespace = async function (namespace: any) {
            let data = await saeClient.request("POST", NamespaceUri, namespace, body, headers, requestOption);
            return data;
        }

        /**
         * 更新命名空间
         * @param Namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.updateNamespace = async function (namespace: any) {
            let data = await saeClient.request("PUT", NamespaceUri, namespace, body, headers, requestOption);
            return data;
        }

        saeClient.getNamespace = async function () {
            let queries = {
                "CurrentPage": 1,
                "PageSize": 10
              };
            let obj = await saeClient.request("GET", DescribeNamespacesUri, queries, body, headers, requestOption);
            let data = obj['Data']['Namespaces'][0];
            return data;
        }

        saeClient.UpdateNamespaceVpc = async function (NamespaceId: string, VpcId: string) {
            let queries = {NamespaceId,VpcId};
            let data = await saeClient.request("POST", UpdateNamespaceVpc, queries, body, headers, requestOption);
            return data
        }
        /*
         * 创建一个应用
         * @param applictionObject 应用信息
         * @returns 创建结果
         */
        saeClient.createApplication = async function (applictionObject: any) {
            let data = await saeClient.request("POST", CreateApplicationUri, applictionObject, body, headers, requestOption);
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
         * @param applictionObject 应用信息
         * @returns 部署结果
         */
        saeClient.deployApplication = async function (applictionObject: any) {
            let data = await saeClient.request("POST", DeployApplicationUri, applictionObject, body, headers, requestOption);
            return data;
        }

        /**
         * 绑定SLB
         * @param SLB SLB信息
         * @returns 绑定结果
         */
        saeClient.bindSLB = async function (SLB: any) {
            let data = await saeClient.request("POST", BindSLBUri, SLB, body, headers, requestOption);
            return data;
        }

        /**
         * 获取SLB信息
         * @param appId 
         * @returns 
         */
        saeClient.getSLB = async function name(appId: any) {
            let data = await saeClient.request("GET", GETSLBUri, { AppId: appId }, body, headers, requestOption);
            return data;
        }
        this.saeClient = saeClient;
        return saeClient;
    }
}