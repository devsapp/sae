## 整体YAML
```
services:
  component-test:
    component: sae-application
    props:
      name: test 
      code:
        packageType: PhpZip # 必填
        packageVersion: 0.0.1
        packageUrl: test.war # 文件路径
        ossConfig: bucket4sae
      decription: This is a test description #  选填
      cpu: 500 #  选填
      memory: 1024 #  选填
      replicas: 1 #  选填
```

## 必填参数：
### name: 名称（正则校验） 
### runtime: java/php/python/image
### code: runtime配置
#### runtime === java
javaRuntimeConfig:
  type: jar/war
  runtimeVersion: openJDK8
  webContainer: 运行环境 # 如果是image则不存在
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'

#### runtime === php  
phpRuntimeConfig:
  type: zip
  runtimeVersion: IMAGE_PHP_5_4
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'


#### runtime === python
phpRuntimeConfig:
  type: zip
  runtimeVersion: PYTHON 3.9.15
  version: xxx # 默认为当前时间戳
  timezone: xxx # 默认Asia/Shanghai
  localCodeUri: './demo.jar' # 默认传到OSS
  packageUrl: 'https://edas-hz.oss-cn-hangzhou.aliyuncs.com/demo/1.0/hello-sae.war'


#### runtime === image
imageRuntimeConfig:
  type: image # 默认为image
  runtimeVersion: openJDK8 # 非必填
  imageUrl: xxx # 针对 image有效
