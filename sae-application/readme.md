## 整体YAML
```
services:
  component-test:
    component: sae-application
    props:
      name: test
      javaRuntimeConfig: xxx
      decription: This is a test description #  选填
      cpu: 500 #  选填
      memory: 1024 #  选填
      replicas: 1 #  选填
```

## 必填参数：
### name: 名称（正则校验） 
### runtime: java/php/python/image
### runtime配置: 
- javaRuntimeConfig
- javaImageRuntimeConfig 
- phpRuntimeConfig
- phpImageRuntimeConfig
- pythonRuntimeConfig
- pythonImageRuntimeConfig
- imageRuntimeConfig

#### runtime === java
javaRuntimeConfig:
  type: jar/war
  runtimeVersion: openJDK8
  webContainer: 运行环境 # 如果是image则不存在
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'


javaImageRuntimeConfig:
  runtimeVersion: openJDK8 # 非必填
  imageUrl: xxx # 针对 image有效


#### runtime === php  
phpRuntimeConfig:
  type: zip
  runtimeVersion: IMAGE_PHP_5_4
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'

phpImageRuntimeConfig:
  runtimeVersion: IMAGE_PHP_5_4 # 非必填
  imageUrl: xxx # 针对 image有效
  xxx


#### runtime === python
pythonRuntimeConfig:
  type: zip
  runtimeVersion: PYTHON 3.9.15
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'

pythonImageRuntimeConfig:
  runtimeVersion: PYTHON 3.9.15
  imageUrl: xxx # 针对 image有效

#### runtime === image
imageRuntimeConfig:
  imageUrl: xxx # 针对 image有效

