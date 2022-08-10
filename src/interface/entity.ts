export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface InputProps {
  props: any, // 用户自定义输入
  credentials: ICredentials, // 用户秘钥
  appName: string, // 
  project: {
    component: string, // 组件名（支持本地绝对路径）
    access: string, // 访问秘钥名
    projectName: string, // 项目名
  },
  command: string, // 执行指令
  args: string, // 命令行 扩展参数
  path: {
    configPath: string // 配置路径
  }
}

export interface OutputProps {
  componentType?: string,
  accessLink?: string,
  console: string,
  application: {
    region?: string,
    namespaceId?: string,
    namespaceName?: string,
    vpcId?: string,
    vSwitchId?: string,
    securityGroupId?: string,
    appId?: string,
    appName: string,
    packageType?: string,
    imageUrl?: string,
    packageUrl?: string,
    cpu?: number,
    memory?: number,
    replicas?: number,
    scaleRuleEnabled?: any,
    instances?: number,
    appDescription?: string,
    runningInstances?: number,
    appDeletingStatus?: any,
  },
  slb: {
    InternetIp?: string,
    InternetPort?: string,
    IntranetIp?: string,
    IntranetPort?: string,
  }
}