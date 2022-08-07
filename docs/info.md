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
| application-name  | -        | 必填           | 必填    | 应用名   |
| output  | -        | 选填           | 选填    | 输出路径   |


### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取函数详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名，函数名等信息，例如`s cli sae info --application-name test`；

上述命令的执行结果示例：

```
sae-test: 
  ScaleRuleEnabled:  false
  Instances:         1
  AppDescription:    
  AppId:             9e1c5e93-xxxxx-98d3581b261
  RunningInstances:  1
  NamespaceId:       cn-hangzhou:test
  RegionId:          cn-hangzhou
  AppDeletingStatus: false
  AppName:           test
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
