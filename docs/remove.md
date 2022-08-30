---
title: Remove 命令
description: 'Remove 命令'
position: 3
category: '构建&部署'
---

# Remove 命令

`remove` 命令是对已经部署的资源进行移除的操作。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`remove -h`/`remove --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义  |
| ----- | -------- | -------------- | ------- | ---------- |
| application-name  | -        | 必填           | 必填    | 应用名   |
| namespace-id | -        | 必填           | 必填    | 命名空间id   |
| assume-yes | y        | 选填           | 在交互时，默认选择`y`      |


### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove`删除线上资源；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名信息，例如`s cli sae remove --application-name test`。

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
