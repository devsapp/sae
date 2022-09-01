---
title: 查看应用 info
description: '查看应用 info'
position: 3
category: '其他功能'
---

# Info 命令

`info` 命令是查看应用线上资源详情的命令。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义  |
| ----- | -------- | -------------- | ------- | ---------- |
| region | - | 选填 | 必填 | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| namespace-id | -        | 选填           | 选填    | 命名空间id   |
| application-name  | -        | 必填           | 必填    | 应用名   |
| output  | -        | 选填           | 选填    | 输出路径   |

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取函数详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名信息，例如`s cli sae info --region cn-hangzhou --namespace-id cn-hangzhou --application-name test --output info.txt`；

上述命令的执行结果示例：

```
sae-test: 
  console:       https://sae.console.aliyun.com/#/AppList/AppDetail?appId=3582e8ed-b0fxxxxf28932390b18&regionId=cn-hangzhou&namespaceId=undefined
  application: 
    region:            cn-hangzhou
    namespaceId:       cn-hangzhou
    namespaceName:     China East 1 (Hangzhou)
    vpcId:             vpc-bp14oxxxxc7pobl
    vSwitchId:         vsw-bp17xxxxyrmpfg9zr
    securityGroupId:   sg-bp1axxxx5kmbwb6v2
    appId:             3582e8ed-b0fxxxxf28932390b18
    appName:           test
    cpu:               500
    memory:            1024
    replicas:          1
    scaleRuleEnabled:  false
    instances:         1
    runningInstances:  1
    appDeletingStatus: false
    appDescription:    This is a test.
  slb: 
    InternetIp: 47.98.152.222
    Intranet: 
      (empty array)
    Internet: 
      - 
        TargetPort: 80
        Port:       80
        Protocol:   HTTP
  componentType: sae
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
