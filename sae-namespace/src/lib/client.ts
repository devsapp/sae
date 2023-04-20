import * as core from '@serverless-devs/core';
// @ts-ignore
const ROAClient = core.popCore.ROAClient;
const { lodash } = core;

export async function vpcAvailable(vpcId, region, credentials) {

    const client = new core.popCore({
        accessKeyId: credentials?.AccessKeyID,
        accessKeySecret: credentials?.AccessKeySecret,
        // @ts-ignore
        securityToken: credentials?.SecurityToken,
        endpoint: 'https://vpc.aliyuncs.com',
        apiVersion: '2016-04-28'
    });

    const params = {
        "RegionId": region,
        "VpcId": vpcId
    }

    const requestOption = {
        method: 'POST',
        formatParams: false,

    };
    const data = await client.request('DescribeVpcs', params, requestOption);
    if (data['TotalCount'] != 1) {
        return false;
    }
    if (data['Vpcs']['Vpc'][0]['Status'] != 'Available') {
        return false;
    }
    return true;
}

export async function describeSecurityGroups(vpcId, region, credentials) {
    const client = new core.popCore({
        accessKeyId: credentials?.AccessKeyID,
        accessKeySecret: credentials?.AccessKeySecret,
        // @ts-ignore
        securityToken: credentials?.SecurityToken,
        endpoint: `https://ecs-${region}.aliyuncs.com`,
        apiVersion: '2014-05-26'
    });

    const params = {
        "RegionId": region,
        "VpcId": vpcId
    }

    const requestOption = {
        method: 'POST',
        formatParams: false,

    };
    const data = await client.request('DescribeVpcs', params, requestOption);
    return data;
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
        const NamespaceResourcesUri = '/pop/v1/sam/namespace/describeNamespaceResources';
        const DescribeNamespaceListUri = '/pop/v1/sam/namespace/describeNamespaceList';
        const UpdateNamespaceVpcUri = '/pop/v1/sam/namespace/updateNamespaceVpc';
        const DescribeVpcsUri = '/pop/v1/sam/vpc/vpcs';
        const DescribeVSwitchesUri = '/pop/v1/sam/vpc/vSwitchs';
        const CreateApplicationUri = '/pop/v1/sam/app/createApplication';
        const ListApplicationsUri = '/pop/v1/sam/app/listApplications';
        const DeployApplicationUri = '/pop/v1/sam/app/deployApplication';
        const DeleteApplicationUri = '/pop/v1/sam/app/deleteApplication';
        const BindSLBUri = "/pop/v1/sam/app/slb";
        const GETSLBUri = '/pop/v1/sam/app/slb';
        const DescribeChangeOrderUri = '/pop/v1/sam/changeorder/DescribeChangeOrder';
        const DescribeApplicationConfigUri = '/pop/v1/sam/app/describeApplicationConfig';
        const StopApplicationUri = '/pop/v1/sam/app/stopApplication';
        const StartApplicationUri = '/pop/v1/sam/app/startApplication';
        const RescaleApplicationUri = '/pop/v1/sam/app/rescaleApplication';
        const UpdateAppSecurityGroupUri = '/pop/v1/sam/app/updateAppSecurityGroup';
        const RescaleApplicationVerticallyUri = '/pop/v1/sam/app/rescaleApplicationVertically';

        const ListNamespacedConfigMapsUri = '/pop/v1/sam/configmap/listNamespacedConfigMaps';
        const CreateConfigMapUri = '/pop/v1/sam/configmap/configMap';
        const UpdateConfigMapUri = '/pop/v1/sam/configmap/configMap';
        const DeleteConfigMapUri = '/pop/v1/sam/configmap/configMap';

        const SecretsUri = '/pop/v1/sam/secret/secrets';
        const SecretUri = '/pop/v1/sam/secret/secret';

        const RouterUri = '/pop/v1/sam/ingress/Ingress'
        const RoutersUri = '/pop/v1/sam/ingress/IngressList'

        saeClient.rescaleVertically = async function (appId: string, cpu: number, memory: number) {
            const queries = {
                "AppId": appId,
                "Cpu": cpu,
                "Memory": memory,
            };
            const data = await saeClient.request("POST", RescaleApplicationVerticallyUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        saeClient.updateSecurityGroup = async function (appId: string, securityGroupId: string) {
            const queries = {
                "AppId": appId,
                "SecurityGroupId": securityGroupId,
            };
            const data = await saeClient.request("PUT", UpdateAppSecurityGroupUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        saeClient.rescaleApplication = async function (appId: string, replicas: number) {
            const queries = {
                "AppId": appId,
                "Replicas": replicas,
            };
            const data = await saeClient.request("PUT", RescaleApplicationUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        saeClient.startApplication = async function (id: string) {
            const queries = {
                "AppId": id
            };
            const data = await saeClient.request("PUT", StartApplicationUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        saeClient.stopApplication = async function (id: string) {
            const queries = {
                "AppId": id
            };
            const data = await saeClient.request("PUT", StopApplicationUri, queries, body, headers, requestOption);
            return data['Data'].ChangeOrderId;
        }

        saeClient.describeNamespace = async function (id: string) {
            const queries = {
                NamespaceId: id
            };
            let data = {};
            try {
                data = await saeClient.request("GET", NamespaceUri, queries, body, headers, requestOption);
            } catch (e) {
                if (e.message.includes('The specified NamespaceId does not exist.')) {
                    // data['Data'] = await this.getNamespace();
                    data['Data'] = false;
                }
            }
            return data;
        }

        saeClient.describeNamespaceResources = async function (id: string) {
            const queries = {
                NamespaceId: id
            };
            let data = {};
            try {
                data = await saeClient.request("GET", NamespaceResourcesUri, queries, body, headers, requestOption);
            } catch (e) {
                if (e.message.includes('The specified NamespaceId does not exist.')) {
                    // data['Data'] = await this.getNamespace();
                    data['Data'] = false;
                }
            }
            return data;
        }
        /**
         * 获取应用配置信息
         * @param appId id
         */
        saeClient.describeApplicationConfig = async function (appId: any) {
            const queries = {
                AppId: appId
            };
            const data = await saeClient.request("GET", DescribeApplicationConfigUri, queries, body, headers, requestOption);
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
                AppId: appId, CurrentPage: 1, PageSize: 10,
            };
            if (!lodash.isEmpty()) {
                queries['CoType'] = coType;
            }
            const data = await saeClient.request("GET", ListChangeOrdersUri, queries, body, headers, requestOption);
            return data;
        }

        /**
         * 查询变更单信息
         * @param orderId id
         * @returns 
         */
        saeClient.describeChangeOrder = async function (orderId: any) {
            const queries = {
                ChangeOrderId: orderId,
            };
            const data = await saeClient.request("GET", DescribeChangeOrderUri, queries, body, headers, requestOption);
            return data;
        }
        /**
         * 创建命名空间
         * @param Namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.createNamespace = async function (namespace: any) {
            const queries = {
                NamespaceId: namespace.id,
                NamespaceName: namespace.name,
                NamespaceDescription: namespace.description,
            };
            const data = await saeClient.request("POST", NamespaceUri, queries, body, headers, requestOption);
            return data;
        }

        /**
         * 更新命名空间
         * @param namespace 命名空间
         * @returns 命名空间信息
         */
        saeClient.updateNamespace = async function (namespace: any) {
            const queries = {
                NamespaceId: namespace.id,
                NamespaceName: namespace.name,
                NamespaceDescription: namespace.description,
            };
            const data = await saeClient.request("PUT", NamespaceUri, queries, body, headers, requestOption);
            return data;
        }

        saeClient.getNamespace = async function () {
            const queries = {};
            const obj = await saeClient.request("GET", DescribeNamespaceListUri, queries, body, headers, requestOption);
            const data = obj['Data'][0];
            return data;
        }

        saeClient.updateNamespaceVpc = async function (namespaceId: string, vpcId: string) {
            const queries = { NamespaceId: namespaceId, VpcId: vpcId };
            const data = await saeClient.request("POST", UpdateNamespaceVpcUri, queries, body, headers, requestOption);
            return data
        }

        saeClient.describeVpcs = async function () {
            const queries = {};
            const obj = await saeClient.request("GET", DescribeVpcsUri, queries, body, headers, requestOption);
            const data = obj['Data'];
            return data;
        }

        saeClient.describeVSwitches = async function (vpcId: string) {
            const queries = { VpcId: vpcId };
            const obj = await saeClient.request("GET", DescribeVSwitchesUri, queries, body, headers, requestOption);
            const data = obj['Data'];
            return data;
        }

        /*
         * 创建一个应用
         * @param applicationObject 应用信息
         * @returns 创建结果
         */
        saeClient.createApplication = async function (applicationObject: any) {
            const data = await saeClient.request("POST", CreateApplicationUri, applicationObject, body, headers, requestOption);
            return data;
        }

        /**
         * 获取应用列表
         * @param appName 应用名称
         * @returns 应用列表
         */
        saeClient.listApplications = async function (appName: any, namespaceId?: any) {
            if (lodash.isEmpty(namespaceId)) {
                // 使用默认命名空间
                const defaultNamespace = await this.getNamespace();
                namespaceId = defaultNamespace.NamespaceId;
            }
            const queries = {
                "AppName": appName,
                "NamespaceId": namespaceId
            };
            const data = await saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption);
            if (data['Data']['Applications'].length > 0) {
                data['Data']['Applications'][0]['namespaceId'] = namespaceId;
            }
            return data;
        }

        /**
         * 部署应用
         * @param applicationObject 应用信息
         * @returns 部署结果
         */
        saeClient.deployApplication = async function (applicationObject: any) {
            const data = await saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption);
            return data;
        }

        /**
         * 根据id删除应用
         * @param appId id
         */
        saeClient.deleteApplication = async function (appId: any) {
            const queries = {
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
            const data = await saeClient.request("GET", GETSLBUri, { AppId: appId }, body, headers, requestOption);
            return data;
        }

        /**
         * 更新已存在的应用
         * @param applicationObject 
         */
        saeClient.updateApplication = async function (applicationObject: any) {
            const queries = {
                FieldType: 'appName', FieldValue: applicationObject.AppName
            };
            const data = await saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption);
            const appId = data['Data']['Applications'][0]['AppId'];
            applicationObject.AppId = appId;
            const res = await saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption);
            return res;
        }

        /**
         * 查看命名空间配置项
         * @param namespaceId 
         */
        saeClient.listNamespacedConfigMaps = async function (namespaceId: string) {
            const queries = {
                NamespaceId: namespaceId, 
            };
            const data = await saeClient.request("GET", ListNamespacedConfigMapsUri, queries, body, headers, requestOption);
            return data['Data']['ConfigMaps'];
        }

        saeClient.createConfigMap = async function (namespaceId: string, name: string, configData: object) {
            const queries = {
                NamespaceId: namespaceId,
                Name: name,
                Data: JSON.stringify(configData),
            };
            const data = await saeClient.request("POST", CreateConfigMapUri, queries, body, headers, requestOption);
            return data['Data']['ConfigMapId'];
        }

        saeClient.updateConfigMap = async function (configMapId: number, configData: object, description?: string) {
            
            const queries = {
                ConfigMapId: configMapId,
                Data: JSON.stringify(configData),
                Description: description,
            };
            
            const data = await saeClient.request("PUT", UpdateConfigMapUri, queries, body, headers, requestOption);
            return data['Data']['ConfigMapId'];
        }

        saeClient.deleteConfigMap = async function (configMapId: number) {
            const queries = {
                ConfigMapId: configMapId,
            };
            const res = await saeClient.request("DELETE" , DeleteConfigMapUri, queries, body, headers, requestOption);
            return res;
        }

        saeClient.createSecret = async function (namespaceId: string, secretName: string, secretData: object, secretType: string) {
            const queries = {
                NamespaceId: namespaceId,
                SecretName: secretName,
                SecretData: JSON.stringify(secretData),
                SecretType: secretType,
            };
            const data = await saeClient.request("POST", SecretUri, queries, body, headers, requestOption);
            return data['Data']['SecretId'];
        }

        saeClient.updateSecret = async function (namespaceId: string, secretId: number, secretData: object) {
            const queries = {
                NamespaceId: namespaceId,
                SecretId: secretId,
                SecretData: JSON.stringify(secretData),
            };
            const data = await saeClient.request("PUT", SecretUri, queries, body, headers, requestOption);
            return data['Data']['SecretId'];
        }

        saeClient.deleteSecret = async function (namespaceId: string, secretId: number) {
            const queries = {
                NamespaceId: namespaceId,
                SecretId: secretId,
            };
            const data = await saeClient.request("DELETE", SecretUri, queries, body, headers, requestOption);
            return data['Data']['SecretId'];
        }

        saeClient.listSecrets = async function (namespaceId: string) {
            const queries = {
                NamespaceId: namespaceId, 
            };
            const data = await saeClient.request("GET", SecretsUri, queries, body, headers, requestOption);
            return data['Data']['Secrets'];
        }

        saeClient.describeSecrets = async function (namespaceId: string, secretId: string) {
            const queries = {
                NamespaceId: namespaceId,
                SecretId: secretId,
            };
            const data = await saeClient.request("GET", SecretUri, queries, body, headers, requestOption);
            return data['Data'];
        }

        saeClient.createRouter = async function ({ namespaceId, description, listenerProtocol, slbId, listenerPort, rules, defaultRule, loadBalanceType}) {
            const queries = {
                NamespaceId: namespaceId,
                Description: description,
                ListenerProtocol: listenerProtocol,
                SlbId: slbId,
                ListenerPort: listenerPort,
                Rules: JSON.stringify(rules),
                DefaultRule: JSON.stringify(defaultRule),
                LoadBalanceType: loadBalanceType,
            };
            const data = await saeClient.request("POST", RouterUri, queries, body, headers, requestOption);
            return data['Data']['IngressId'];
        }

        saeClient.updateRouter = async function ({ namespaceId, ingressId, description, listenerProtocol, slbId, listenerPort, rules, defaultRule, loadBalanceType}) {
            const queries = {
                NamespaceId: namespaceId,
                IngressId: ingressId,
                Description: description,
                ListenerProtocol: listenerProtocol,
                SlbId: slbId,
                ListenerPort: listenerPort,
                Rules: JSON.stringify(rules),
                DefaultRule: JSON.stringify(defaultRule),
                LoadBalanceType: loadBalanceType,
            };
            const data = await saeClient.request("PUT", RouterUri, queries, body, headers, requestOption);
            return data['Data']['IngressId'];
        }

        saeClient.deleteRouter = async function ( ingressId: number) {
            const queries = {
                IngressId: ingressId,
            };
            const data = await saeClient.request("DELETE", RouterUri, queries, body, headers, requestOption);
            return data['Data']['IngressId'];
        }

        saeClient.describeRouter = async function (ingressId: number) {
            const queries = {
                IngressId: ingressId,
            };
            const data = await saeClient.request("GET", RouterUri, queries, body, headers, requestOption);
            return data['Data'];
        }

        saeClient.listRouters = async function (namespaceId: string) {
            const queries = {
                NamespaceId: namespaceId, 
            };
            const data = await saeClient.request("GET", RoutersUri, queries, body, headers, requestOption);
            return data['Data']['IngressList'];
        }

        this.saeClient = saeClient;
        return saeClient;
    }
}