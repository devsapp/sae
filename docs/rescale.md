---
title: Rescale 命令
description: 'Rescale 命令'
position: 3
category: '构建&部署'
---

# Rescale 命令

`rescale` 命令是对已经部署的资源进行扩缩容的操作。

- [命令解析](#命令解析)
  - [参数解析](#参数解析)
  - [操作案例](#操作案例)
- [权限与策略说明](#权限与策略说明)

## 命令解析

当执行命令`rescale -h`/`rescale --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml模式下必填 | Cli模式下必填 | 参数含义  |
| ----- | -------- | -------------- | ------- | ---------- |
| application-name  | -        | 必填           | 必填    | 应用名   |
| namespace-id | -        | 必填           | 必填    | 命名空间id   |
| replicas  | -        | 必填           | 必填    | 实例数目   |


### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s rescale`对线上资源扩缩容；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定服务名信息，例如`s cli sae rescale --application-name test --replicas 5`。

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
