import * as core from '@serverless-devs/core';
import { InputProps } from './common/entity';
// @ts-ignore
import { ROAClient } from '@alicloud/pop-core';
// @ts-ignore
import { spinner } from "@serverless-devs/core";

import oss, { IOssConfig } from './common/oss.service';
const stringRandom = require('string-random')
const fse = require("fs");
const request = async (params) => {
  const { AccessKeyID, AccessKeySecret, httpMethod = 'POST', uriPath, queries, region='cn-beijing'} = params;
  const client = new ROAClient({
    accessKeyId: AccessKeyID,
    accessKeySecret: AccessKeySecret,
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
  // console.log(queries)
  const requestData = await client.request(httpMethod, uriPath, queries, body, headers, requestOption)
  return requestData
}

export default class SaeComponent {

  async uploadFile(credentials, bucket, region, file, object, type){
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

  async checkStatus(AccessKeyID, AccessKeySecret, AppId, CoType, region){
    let status = true
    while (status){
      try{
        const tempResult = await request({
              AccessKeyID,
              AccessKeySecret,
              httpMethod: "GET",
              uriPath: '/pop/v1/sam/changeorder/ListChangeOrders',
              queries: {AppId, CoType: CoType,CurrentPage: 1, PageSize: 10,},
              region,
            })
        const tempStatus = tempResult['Data']['ChangeOrderList'][0].Status
        if(tempStatus == 2){
          status = false
        }else if(tempStatus == 0){
          status = true
        } else if(tempStatus == 1){
          status = true
        }else if(tempStatus == 3){
          throw Error('应用状态为：执行失败')
        }else if(tempStatus == 6){
          throw Error('应用状态为：终止')
        }else if(tempStatus == 10){
          throw Error('应用状态为：系统异常执行失败')
        }
      }catch (e) {
        if(e.message.includes('应用状态为')){
          throw e
        }
      }
    }
  }

  async deploy(inputs: InputProps) {
    console.log(inputs)
    const todb = await core.load('devsapp/2db')
    await todb.addHistory(inputs)
    let AppId
    let { props: {Region, Namespace, Application, SLB }} = inputs;
    let  credentials = await core.getCredential(inputs.project.access)
    let { AccountID, AccessKeyID, AccessKeySecret } = credentials
    // 创建/更新Namespace
    const vm = spinner('开始部署');
    if(Namespace) {
      vm.text = `部署Namespace: ${Namespace.NamespaceName || Namespace.NamespaceId}`
      const createNamespaceUriPath = "/pop/v1/paas/namespace";
      try {
        await request({
          AccessKeyID,
          AccessKeySecret,
          httpMethod: "POST",
          uriPath: createNamespaceUriPath,
          queries: Namespace,
          Region,
        });
      } catch (e) {
        if (e.message.includes('The specified namespace ID already exists')) {
          await request({
            AccessKeyID,
            AccessKeySecret,
            httpMethod: "PUT",
            uriPath: createNamespaceUriPath,
            queries: Namespace,
            Region,
          });
        } else {
          throw e
        }
      }
    }

    let privateStatus = false
    let tempObject = stringRandom(16)
    if(Application) {
      vm.text = `部署Appliction: ${Application.AppName}`
      // 创建/更新Application
      const createApplicationUriPath = "/pop/v1/sam/app/createApplication";
      const updateApplicationUriPath = "/pop/v1/sam/app/deployApplication";
      const applictionObject = JSON.parse(JSON.stringify(Application))
      delete applictionObject.Code
      if (Namespace.NamespaceId) {
        applictionObject.NamespaceId = Namespace.NamespaceId
      }
      // 对code进行处理
      vm.text = `处理代码 ...`
      const code = Application.Code ? Application.Code : {}
      const image = code.Image
      let codePackage = code.Package

      if (image) {
        applictionObject.PackageType = 'Image'
        applictionObject.ImageUrl = image
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

        if (codePackage.Path.endsWith('.war')) {
          tempObject = tempObject + '.war'
          applictionObject.PackageType = 'War'
          applictionObject.Jdk = 'Open JDK 8';
          applictionObject.WebContainer = 'apache-tomcat-8.5.42';
          if (await fse.existsSync(codePackage.Path)) {
            vm.text = `上传代码：${codePackage.Bucket.Region} / ${codePackage.Bucket.Name} / ${tempObject}`
            await this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')
            privateStatus = true
            applictionObject.PackageUrl = `https://${codePackage.Bucket.Name}.oss-${codePackage.Bucket.Region}.aliyuncs.com/${tempObject}`;
          } else if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
            applictionObject.PackageUrl = codePackage.Path;
          } else {
            throw Error("未能成功找到.war类型的文件，请确定package的路径正确")
          }
        } else if (codePackage.Path.endsWith('.jar')) {
          tempObject = tempObject + '.jar'
          applictionObject.PackageType = 'FatJar'
          applictionObject.Jdk = 'Open JDK 8';
          if (await fse.existsSync(codePackage.Path)) {
            vm.text = `上传代码：${codePackage.Bucket.Region} / ${codePackage.Bucket.Name} / ${tempObject}`
            await this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')
            privateStatus = true
            applictionObject.PackageUrl = `https://${codePackage.Bucket.Name}.oss-${codePackage.Bucket.Region}.aliyuncs.com/${tempObject}`;
          } else if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
            applictionObject.PackageUrl = codePackage.Path;
          } else {
            throw Error("未能成功找到.jar类型的文件，请确定package的路径正确")
          }
        } else {
          throw Error("未能找到package，请确定参数传递正确")
        }
      } else {
        throw Error("未能找到iamge/package，请确定参数传递正确")
      }

      // console.log(applictionObject)

      try {
        vm.text = `尝试创建应用 ...`
        await request({
          AccessKeyID,
          AccessKeySecret,
          httpMethod: "POST",
          uriPath: createApplicationUriPath,
          queries: applictionObject,
          Region,
        })
        const listApplicationResult = await request({
          AccessKeyID,
          AccessKeySecret,
          httpMethod: "GET",
          uriPath: "/pop/v1/sam/app/listApplications",
          queries: {FieldType: 'appName', FieldValue: Application.AppName},
          Region,
        });
        AppId = listApplicationResult['Data']['Applications'][0]['AppId']
      } catch (e) {
        if (e.message.includes('AppName is exsited')) {
          vm.text = `应用已存在，即将进行更新 ...`
        } else {
          throw e
        }
      }

      vm.text = `应用部署中 ...`
      const listApplicationResult = await request({
        AccessKeyID,
        AccessKeySecret,
        httpMethod: "GET",
        uriPath: "/pop/v1/sam/app/listApplications",
        queries: {FieldType: 'appName', FieldValue: Application.AppName},
        Region,
      });
      applictionObject.AppId = listApplicationResult['Data']['Applications'][0]['AppId']
      AppId = applictionObject.AppId
      await request({
        AccessKeyID,
        AccessKeySecret,
        httpMethod: "POST",
        uriPath: updateApplicationUriPath,
        queries: applictionObject,
        Region,
      });
      // 部署完成，更新应用的对象存储状态
      if(privateStatus){
        await this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')
      }

      // 检查应用部署状态
      vm.text = `检查部署状态 ...`
      await this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoDeploy', Region,)
    }

    const result = {
      "Namespace": Namespace,
      "Application": {
        AppId: AppId,
        AppName: Application.AppName
      },
      "Console": `https://sae.console.aliyun.com/#/AppList/AppDetail?appId=${AppId}&regionId=${Region}&namespaceId=${Namespace.NamespaceId}`
    }

    // 绑定SLB
    if(SLB) {
      vm.text = `部署SLB ... `
      const bindSLBUriPath = "/pop/v1/sam/app/slb";
      if (SLB.Internet && typeof SLB.Internet == 'object') {
        SLB.Internet = JSON.stringify(SLB.Internet)
      }
      if (SLB.Intranet && typeof SLB.Intranet == 'object') {
        SLB.Intranet = JSON.stringify(SLB.Intranet)
      }
      if(AppId){
        SLB.AppId = AppId
      }
      await request({
        AccessKeyID,
        AccessKeySecret,
        httpMethod: "POST",
        uriPath: bindSLBUriPath,
        queries: SLB,
        Region,
      });

      // 检查应用部署状态
      vm.text = `检查SLB绑定状态 ...`
      await this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoBindSlb', Region,)

      // 获取SLB信息
      vm.text = `获取SLB信息 ... `
      const slbConfig = await request({
        AccessKeyID,
        AccessKeySecret,
        httpMethod: "GET",
        uriPath: '/pop/v1/sam/app/slb',
        queries: {AppId},
        Region,
      });
      if(slbConfig["Data"]['InternetIp']) {
        result['SLB'] = {
          InternetIp: slbConfig["Data"]['InternetIp']
        }
      }
      if(slbConfig["Data"]['IntranetSlbId']) {
        result['SLB'] = result['SLB'] ? result['SLB'] : {}
        result['SLB']['IntranetSlbId'] = slbConfig["Data"]['InternetIp']
      }
    }
    vm.stop()

    inputs.props = {
      report_content: {
        sae: [
          {
            region: Region,
            namespace: Namespace.NamespaceId,
            appid: AppId
          }
        ]
      }
    }
    await todb.addSource(inputs)

    return result
  }
}
