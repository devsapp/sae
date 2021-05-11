import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps } from './common/entity';
import { ROAClient } from '@alicloud/pop-core';
import { get } from "lodash"; 
import { spinner } from "@serverless-devs/core";
const POLLINGTIME = 10;
const request = async (params) => {
  const { AccessKeyID, AccessKeySecret, httpMethod = 'POST', uriPath, queries } = params;
  const client = new ROAClient({
    accessKeyId: AccessKeyID,
    accessKeySecret: AccessKeySecret,
    endpoint: "https://sae.cn-beijing.aliyuncs.com",
    apiVersion: "2019-05-06",
  });
  const body = `{}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOption = {};
  const requestData = await client.request(httpMethod, uriPath, queries, body, headers, requestOption)
  return requestData
}
export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }
  /**
   * demo 实例
   * @param inputs
   * @returns
   */
  public async test(inputs: InputProps) {
    logger.info('deploy test');
    return { hello: 'hanxie' };
  }
  public async create(inputs: InputProps) {
    const { props: { AppName, RegionId, PackageType, ImageUrl, Replicas, NamespaceId, AutoConfig, Cpu, Memory, Deploy }, credentials: { AccessKeyID, AccessKeySecret } } = inputs;
    const createAppUriPath = "/pop/v1/sam/app/createApplication";
    const createAppAueries = {
      RegionId,
      AppName,
      PackageType,
      ImageUrl,
      Replicas,
      NamespaceId,
      AutoConfig,
      Cpu,
      Memory,
      Deploy,
    };
    let times = 0;
    let createTimes = 0;
    const getSlbStatus = async(AppId)=>{
      times++;
      if(times%POLLINGTIME>0){
        getSlbStatus(AppId);
        return;
      }
      const SlburiPath = '/pop/v1/sam/app/slb';
      const SlbUriQueries = {
        AppId,
      };
      const SlbData = await request({AccessKeyID, AccessKeySecret, httpMethod: "GET", uriPath:SlburiPath, queries:SlbUriQueries});
      const ip = get(SlbData, 'Data.InternetIp');
      const port = get(SlbData, 'Data.Internet[0].TargetPort')
      if(times < 100000 ){
        if(ip && port){
          vm.succeed('执行成功');
          logger.info(`${ip}:${port}`);
          return `${ip}:${port}`
        }else{
          getSlbStatus(AppId)
        }
      }else{
        vm.warn('执行失败');
        return SlbData
      }
    }
    const bindSLb = async(AppId)=>{
      const bindSlbUriPath = '/pop/v1/sam/app/slb';
      const bindSlbUriQueries = {
        AppId,
        "Internet": "[{\"port\":80,\"targetPort\":8080,\"protocol\":\"HTTP\"}]"
      };
      const BindSlbData = await request({AccessKeyID, AccessKeySecret, httpMethod: "POST", uriPath:bindSlbUriPath, queries:bindSlbUriQueries});
      if(get(BindSlbData, 'Data.ChangeOrderId')){
        logger.info(get(BindSlbData, 'Data.ChangeOrderId'));
        const slbData = await getSlbStatus(AppId);
        return {http:slbData}
      }else{
        vm.warn('执行失败');
        return BindSlbData
      }
    }
    const getChangeOrderStatus = async(AppId)=>{
      createTimes++;
      if(createTimes%POLLINGTIME>0){
        getChangeOrderStatus(AppId);
        return;
      }
      const SlburiPath = '/pop/v1/sam/changeorder/ListChangeOrders';
      const SlbUriQueries = {
        CurrentPage: 1,
        PageSize: 10,
        CoType: 'CoDeploy',
        AppId,
      };
      const {Data: { ChangeOrderList },} = await request({AccessKeyID, AccessKeySecret, httpMethod: "GET", uriPath:SlburiPath, queries:SlbUriQueries});
      const status = get(ChangeOrderList, '[0].Status', 'null')
      if(createTimes<100000){
        if(status == 2){
          vm.text = 'SLB绑定中';
          bindSLb(AppId)
        }else{
          getChangeOrderStatus(AppId)
        }
      }else{
        vm.warn('执行失败');
        return ChangeOrderList;
      }
    }
    const vm = spinner('开始部署');
    const {Message, Data: {AppId}} = await request({ AccessKeyID, AccessKeySecret, httpMethod: "POST", uriPath:createAppUriPath, queries:createAppAueries });
    if (AppId) {
      logger.info(AppId);
      vm.text = '部署应用中';
      await getChangeOrderStatus(AppId);
    } else {
      vm.warn('执行失败');
      logger.error(Message)
      return Message
    }
  }
}
