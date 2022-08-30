---
title: Start 命令
description: 'Start 命令'
position: 3
category: '构建&部署'
---

# Start 命令

`start` 命令是对已经部署的资源进行启动的操作。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`start -h`/`start --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义  |
| ----- | -------- | -------------- | ------- | ---------- |
| region | - | 选填 | 必填 | 地区，取值范围：`cn-hangzhou, cn-beijing, cn-beijing, cn-hangzhou, cn-shanghai, cn-qingdao, cn-zhangjiakou, cn-huhehaote, cn-shenzhen, cn-chengdu, cn-hongkong, ap-southeast-1, ap-southeast-2, ap-southeast-3, ap-southeast-5, ap-northeast-1, eu-central-1, eu-west-1, us-west-1, us-east-1, ap-south-1` |
| namespace-id | -        | 选填           | 选填    | 命名空间id   |
| application-name  | -        | 必填           | 必填    | 应用名   |
| assume-yes | y        | 选填           | 在交互时，默认选择`y`      |


### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s start`启动线上资源；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名信息，例如`s cli sae start --region cn-hangzhou --namespace-id cn-hangzhou --application-name test`。

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
