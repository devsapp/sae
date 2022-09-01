---
title: 部署应用 deploy
description: '部署应用 deploy'
position: 3
category: '构建&部署'
---

# Deploy 命令

`deploy` 命令通过配置 s.yaml，快速完成应用部署部署。关于应用部署（SAE）组件的 Yaml 规范可以参考[**应用部署（SAE） Yaml 规范文档**](../readme.md)。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`deploy -h`/`deploy --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义  |
| ----- | -------- | -------------- | ------- | ---------- |
| assume-yes | y | 选填  | 选填   | 在交互时，默认选择`y`      |

### 操作案例
- [快速应用实例](https://github.com/devsapp/start-sae)
1. 配置 s.yaml；
```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: sae-nginx-image          #  项目名称
access: alibaba-access         #  秘钥别名

services:
  sae-test:
    component:  devsapp/sae
    props:
      application:
        region: cn-hangzhou
        appName: test
        code:
          packageType: Image
          imageUrl: registry.cn-hangzhou.aliyuncs.com/s-sae/sae-nginx:latest
        port: 80
        cpu: 1000
        memory: 1024
        replicas: 1
        envs: '[{"name": "envTmp", "value": "1234"}]'
      slb: auto
```

2. 执行`s deploy`部署应用；根据上面的YAML文件，组件自动将镜像文件部署到Serverless应用引擎SAE，并绑定公网SLB，让您的应用可以被公网访问。执行结果示例如下：
```
部署成功，请通过以下地址访问您的应用：114.55.2.240
应用详细信息如下：
sae-test: 
  console:     https://sae.console.aliyun.com/#/AppList/AppDetail?appId=3582e8ed-b0fxxxxf28932390b18&regionId=cn-hangzhou&namespaceId=cn-hangzhou
  application: 
    region:      cn-hangzhou
    namespaceId: cn-hangzhou
    vpcId:       vpc-bp14oxxxxc7pobl
    vSwitchId:   vsw-bp17xxxxyrmpfg9zr
    appId:       3582e8ed-b0fxxxxf28932390b18
    appName:     test
    packageType: Image
    imageUrl:    registry.cn-hangzhou.aliyuncs.com/s-sae/sae-java:latest
    cpu:         500
    memory:      1024
    replicas:    1
  slb: 
    InternetIp: 47.98.152.222
    Intranet: 
      (empty array)
    Internet: 
      - 
        TargetPort: 80
        Port:       80
        Protocol:   HTTP
  accessLink:  47.98.152.222:80
```
通过`accessLink`的值即可访问应用。

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
