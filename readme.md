# 前言

通过该组件，快速通过 SAE 部署demo应用

# 测试

s.yaml

```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: sae-app            #  项目名称
access: aliyun-release  #  秘钥别名

services:
  sae-test: #  服务名称
    component:  devsapp/sae
    props:
      region: cn-shenzhen
      appName: dankun-sae
      imageUrl: registry-vpc.cn-shenzhen.aliyuncs.com/sae-demo-image/consumer:1.0
```

# 完整配置

```
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: sae-app            #  项目名称
access: aliyun-release  #  秘钥别名

services:
  sae-test: #  服务名称
    component:  devsapp/sae
    props:
      region: cn-shenzhen
      appName: dankun-sae
      packageType: Image
      imageUrl: registry-vpc.cn-shenzhen.aliyuncs.com/sae-demo-image/consumer:1.0
      replicas: 1
      cpu: 500
      memory: 1024
      appDescription: saedemo
      port: 80
      targetPort: 8080
```

# 参数详情

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| region | True | String | 地域 |
| appName | True | String | 应用 名字 |
| imageUrl | True | String | 镜像地址或者包地址 |
| packageType | false | String | Image或者War或者FatJar |
| replicas | false | Number | 初始实例数。|
| cpu | false | Number | 每个实例所需的CPU，单位为毫核 |
| memory | false | Number | 每个实例所需的内存，单位为MB |
| appDescription | false | String | 应用描述信息。不超过1024个字符。|
| port | false | Number | 被代理的容器端口 |
| targetPort | false | Number | 代理端口 |

