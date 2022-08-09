<h1 align="center">阿里云 SAE 应用部署组件</h1>
<p align="center" class="flex justify-center">
  <a href="https://nodejs.org/en/" class="ml-1">
    <img src="https://img.shields.io/badge/node-%3E%3D%2010.8.0-brightgreen" alt="node.js version">
  </a>
  <a href="https://github.com/devsapp/sae/blob/master/LICENSE" class="ml-1">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="license">
  </a>
  <a href="https://github.com/devsapp/sae/issues" class="ml-1">
    <img src="https://img.shields.io/github/issues/devsapp/sae" alt="issues">
  </a>
  </a>
</p>

# 组件简介

`SAE` 组件帮助用户快速上手阿里云提供的 Serverless应用引擎 SAE，通过配置 s.yaml，快速完成应用部署部署。

# 快速开始
1. 配置 s.yaml，[参数详情](#参数详情)
  - s.yaml 样例1
```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: sae-app           #  项目名称
access: default         #  秘钥别名

services:
  sae-test: #  服务名称
    component:  devsapp/sae
    props:
      application:
        region: cn-beijing
        namespaceId: cn-beijing:test
        vpcId: vpc-bpxxxxxxpobl
        vSwitchId: vsw-bpxxxxxxfg9zr
        securityGroupId: sg-bp1xxxxx4db
        appName: test
        appDecription: This is a test description.
        code:
          packageType: PhpZip # 必填
          packageVersion: 0.0.1
          packageUrl: test.war # 文件路径
          ossConfig: bucket4sae
        cpu: 500 #  选填
        memory: 1024 #  选填
        replicas: 1 #  选填
        port: 8080
```
  - s.yaml 样例2
```yaml
edition: 1.0.0
name: sae-app
access: default

services:
  sae-test:
    component:  ../lib
    props:
      application:
        region: cn-hangzhou
        appName: test
        code:
          packageUrl: demo.jar
        port: 8088
```
2. 执行 `s deploy`，自动部署应用并绑定公网SLB，让您的应用可以被公网访问。
- [快速应用实例](https://github.com/devsapp/start-sae)

# application 参数详情

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
| region | String | 是 | cn-beijing | 地区 |
|namespaceId	|String	|	是	|cn-beijing:test|	命名空间ID。仅允许小写英文字母和数字。|
|vpcId	|String	|	是 |vpc-bp1ae8mh1q****|	SAE命名空间对应的VPC。|
|vSwitchId|	String	|	是 |	vsw-bp12gk9****	|应用实例弹性网卡所在的虚拟交换机。|
|securityGroupId	|String	|	是 |	sg-wz9695i4****	|安全组ID。|
|name|	String	|	是|	test	| 应用名称。允许数字、字母以及短划线（-）组合。必须以字母开始，不超过36个字符。|
|decription	|String	|	否	|This is a test description.	|应用描述信息。不超过1024个字符。|
|code|Struct|是|-|代码|
|port|String|否|8080|容器端口。|
|cpu|	Integer	|	否	|1000	| 每个实例所需的CPU，单位为毫核，不能为0。目前仅支持以下固定规格：<br>500<br>1000<br>2000<br>4000<br>8000<br>16000<br>32000|
|memory|	Integer	|	否	|1024	|每个实例所需的内存，单位为MB，不能为0。与CPU为一一对应关系，目前仅支持以下固定规格：<br>1024：对应CPU为500毫核。<br>2048：对应CPU为500和1000毫核。<br>4096：对应CPU为1000和2000毫核。<br>8192：对应CPU为2000和4000毫核。<br>16384：对应CPU为4000和8000毫核。<br>32768：对应CPU为16000毫核。<br>65536：对应CPU为8000、16000和32000毫核。<br>131072：对应CPU为32000毫核。|
|replicas|	Integer	|	否	|1	|初始实例数，默认为1。|
|command|	String		|否|	sleep	|镜像启动命令。该命令必须为容器内存在的可执行的对象。例如：sleep。设置该命令将导致镜像原本的启动命令失效。|
|commandArgs	|String	|	否|	1d	|镜像启动命令参数。上述启动命令所需参数。例如：1d|
|envs|	String	|	否	|[{"name":"envtmp","value":"0"}]	|容器环境变量参数。|
|customHostAlias	|String	|	否	|[{"hostName":"samplehost","ip":"127.0.0.1"}]	|容器内自定义host映射。|
|jarStartOptions	|String	|	否	|-Xms4G -Xmx4G	|JAR包启动应用选项。应用默认启动命令：$JAVA_HOME/bin/java $JarStartOptions -jar $CATALINA_OPTS "$package_path" $JarStartArgs|
|jarStartArgs	|String	|	否	|custom-args	|JAR包启动应用参数。应用默认启动命令：$JAVA_HOME/bin/java $JarStartOptions -jar $CATALINA_OPTS "$package_path" $JarStartArgs|
|liveness|	String	|	否	|{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}	|容器健康检查，健康检查失败的容器将被关闭并恢复。目前仅支持容器内下发命令的方式。例如：{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}<br>command：设置健康检查命令。<br>initialDelaySeconds：设置健康检查延迟检测时间，单位为秒。<br>periodSeconds：设置健康检查周期，单位为秒。<br>timeoutSeconds：设置健康检查超时等待时间，单位为秒。|
|readiness	|String|		否|	{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}	|应用启动状态检查，多次健康检查失败的容器将被关闭并重启。不通过健康检查的容器将不会有SLB流量进入。例如：{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}<br>command：设置健康检查命令。<br>initialDelaySeconds：设置健康检查延迟检测时间，单位为秒。<br>periodSeconds：设置健康检查周期，单位为秒。<br>timeoutSeconds：设置健康检查超时等待时间，单位为秒。|
|deploy|	Boolean	|	否	|true|	是否立即部署。取值说明如下：<br>true：立即部署。<br>false：默认值，稍后部署。|
|edasContainerVersion	|String	|	否|	3.5.3	|Pandora应用使用的运行环境。|
|timezone|	String	|	否|	Asia/Shanghai	|时区默认为Asia/Shanghai。|
|slsConfigs|	String|		否	|[{\"logDir\":\"/root/logs/hsf.log\"}]	|文件日志采集配置。<br>使用SAE自动创建的SLS资源：[{\"logDir\":\"/root/logs/hsf.log\"}]。<br>使用自定义的SLS资源：[{\"projectName\":\"test-sls\",\"logDir\":\"/tmp/readiness.txt\",\"logstoreName\":\"logstore\","logtailName":"testLogtail"}]。<br>projectName：配置SLS上的Project名称。<br>logDir：配置收集日志文件的路径。<br>logstoreName：配置SLS上的Logstore名称。<br>logtailName：配置SLS上的Logtail名称，如果不指定，则表示新建Logtail。|
|nasId|String	|	否|	KSAK****	|挂载的NAS的ID，必须与集群处在同一个地域。它必须有可用的挂载点创建额度，或者其挂载点已经在VPC内的交换机上。如果不填，且存在mountDescs字段，则默认将自动购买一个NAS并挂载至VPC内的交换机上。|
|mountHost|	String	|	否|	example.com	|NAS在应用VPC内的挂载点。|
|mountDesc	|String	|	否|	[{MountPath: "/tmp", NasPath: "/"}]	|挂载描述。|
|preStop|	String	|	否	|{"exec":{"command":["cat","/etc/group"]}}	|停止前执行脚本，格式如：{"exec":{"command":["cat","/etc/group"]}}|
|postStart	|String	|	否	|{"exec":{"command":["cat","/etc/group"]}}	|启动后执行脚本，格式如：{"exec":{"command":["cat","/etc/group"]}}|
|warStartOptions	|String	|	否	|custom-option	|WAR包启动应用选项。应用默认启动命令：java $JAVA_OPTS $CATALINA_OPTS [-Options] org.apache.catalina.startup.Bootstrap "$@" start|
|configMapMountDesc|	String	|否	|[{"configMapId":16,"key":"test","mountPath":"/tmp"}]	|ConfigMap挂载描述。|
|autoConfig|	Boolean	|否	| true |是否自动配置网络环境。取值说明：true：创建应用时SAE自动配置网络环境。NamespaceId、VpcId、vSwitchId和SecurityGroupId的取值将被忽略。false：创建应用时SAE手动配置网络环境。|
|terminationGracePeriodSeconds	|Integer	|	否|	30	|优雅下线超时时间，默认为30，单位为秒。取值范围为1~60。|
|phpConfigLocation	| String	|	否|	/usr/local/etc/php/php.ini	|PHP应用启动配置挂载路径，需要您保证PHP服务器会使用这个配置文件启动。|
|phpConfig	| String	|	否|	k1=v1	|PHP配置文件内容。|
|tomcatConfig	|String	|	否	|{"useDefaultConfig":false,"contextInputType":"custom","contextPath":"hello","httpPort":8088,"maxThreads":400,"uriEncoding":"UTF-8","useBodyEncoding":true,"useAdvancedServerXml":false}|Tomcat文件配置，设置为""或"{}"表示删除配置：<br><br>useDefaultConfig：是否使用自定义配置，若为true，则表示不使用自定义配置；若为false，则表示使用自定义配置。若不使用自定义配置，则下面的参数配置将不会生效。<br>contextInputType：选择应用的访问路径。<br>war：无需填写自定义路径，应用的访问路径是WAR包名称。<br>root：无需填写自定义路径，应用的访问路径是/。<br>custom：需要在下面的自定义路径中填写自定义的路径。<br>contextPath：自定义路径，当contextInputType类型为custom时，才需要配置此参数。<br>httpPort：端口范围为1024~65535，小于1024的端口需要Root权限才能操作。因为容器配置的是Admin权限，所以请填写大于1024的端口。如果不配置，则默认为8080。<br>maxThreads：配置连接池的连接数大小，默认大小是400。<br>uriEncoding：Tomcat的编码格式，包括UTF-8、ISO-8859-1、GBK和GB2312。如果不设置则默认为ISO-8859-1。<br>useBodyEncoding：是否使用BodyEncoding for URL。|
|ossMountDescs	|String	|	否	|[{"bucketName": "oss-bucket", "bucketPath": "data/user.data", "mountPath": "/usr/data/user.data", "readOnly": true}]	|OSS挂载描述信息。|
|ossAkId|	String|	否	|xxxxxx	|OSS读写的AccessKey ID。|
|ossAkSecret|	String	|	否	|xxxxxx	|OSS读写的AccessKey Secret。|
|AcrInstanceId|	String	|	否	|cri-xxxxxx	|容器镜像服务ACR企业版实例ID。当ImageUrl为容器镜像服务企业版时必填。|
|acrAssumeRoleArn	|String	|	否	|acs:ram::123456789012****:role/adminrole|	跨账号拉取镜像时所需的RAM角色的ARN。|
|AssociateEip|	Boolean	|	否	|true	|是否绑定EIP。true：绑定。false：不绑定。|
|OpenCollectToKafka|	Boolean	|	否	|true	|是否开通日志采集到Kafka。true：开通。false：不开通。如果选择不开通，您需要在请求中将KafkaEndpoint、KafkaInstanceId和KafkaLogfileConfig字段的值设为空字符串（即请求中字段的值为""）。|
|KafkaEndpoint|	String	|	否	|10.0.X.XXX:XXXX,10.0.X.XXX:XXXX,10.0.X.XXX:XXXX	|Kafka API的服务接入地址。|
|KafkaLogfileConfig|	String	|	否	|[{"logType":"file_log","logDir":"/tmp/a.log","kafkaTopic":"test2"},{"logType":"stdout","logDir":"","kafkaTopic":"test"}]	|日志采集到Kafka的配置。参数说明如下：<br>logType：日志类型。取值如下：<br>- file_log：文件日志（容器内日志路径）。<br>- stdout：容器标准输出日志。仅可设置1条。<br>logDir：收集日志的路径。<br>kafkaTopic：消息的主题，用于分类消息。|
|KafkaInstanceId|	String	|	否	|alikafka_pre-cn-7pp2l8kr****	|Kafka实例ID。|


## code
code是应用的代码配置，选用Java部署时，支持FatJar、War和Image三种部署方式。

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
| imageUrl | String  |  否  |  registry-vpc.cn-shenzhen.aliyuncs.com/sae-demo-image/consumer:1.0  |   镜像地址，使用镜像方式部署时必填。  |
| packageUrl |  String  |  否  |  https://edas-sh.oss-cn-shanghai.aliyuncs.com/apps/K8S_APP_ID/57ba4361-82aa-4b08-9295-b36b00f0a38e/hello-sae.jar  |   本地文件或部署包地址，使用FatJar或War方式部署时必填。  |
|packageType|	String	|	是	|FatJar	|应用包类型。取值说明如下：<br>当您选择用Java部署时，支持FatJar、War和Image。<br>当您选择用PHP部署时，支持类型如下：<br>PhpZip<br>IMAGE_PHP_5_4<br>IMAGE_PHP_5_4_ALPINE<br>IMAGE_PHP_5_5<br>IMAGE_PHP_5_5_ALPINE<br>IMAGE_PHP_5_6<br>IMAGE_PHP_5_6_ALPINE<br>IMAGE_PHP_7_0<br>IMAGE_PHP_7_0_ALPINE<br>IMAGE_PHP_7_1<br>IMAGE_PHP_7_1_ALPINE<br>IMAGE_PHP_7_2<br>IMAGE_PHP_7_2_ALPINE<br>IMAGE_PHP_7_3<br>IMAGE_PHP_7_3_ALPINE|
|packageVersion|	String	|	否	|1.0.0	|	部署包的版本号。当Package Type为FatJar或War时必填。|
| ossConfig | String  |  否  |  auto  |   oss配置，bucket名字，填`auto`时，默认值为`sae-packages-${region}-${AccountID}`，不存在此bucket则自动创建。  |

### code示例
使用镜像方式部署：
```yaml
code:
  packageType: Image
  imageUrl: registry.cn-hangzhou.aliyuncs.com/namespace4sae/repo4sae:v1
```

使用远程jar包地址：
```yaml
code:
  packageType: FatJar
  packageVersion: 1.0.0
  packageUrl: https://bucket4sae.oss-cn-hangzhou.aliyuncs.com/demo.jar
```

使用本地jar包部署：
```yaml
code:
  packageType: FatJar
  packageVersion: 1.0.0
  packageUrl: demo.jar
```

使用本地war包部署并指定上传地址：
```yaml
code:
  packageType: War
  packageVersion: 1.0.0
  packageUrl: test.war
  ossConfig: bucket4sae
```

# 组件指令
## deploy
通过 `s deploy` 指令自动将demo.jar部署到Serverless应用引擎SAE，并绑定公网SLB，让您的应用可以被公网访问。执行结果示例如下：
```
部署成功，请通过以下地址访问您的应用：114.55.2.240
应用详细信息如下：
sae-test: 
  namespace: 
    id:   cn-hangzhou:test
    name: test-name
  vpcConfig: 
    vpcId:           vpc-bxxxxxhcc7pobl
    vSwitchId:       vsw-bxxxxxpfg9zr
    securityGroupId: sg-bp1xxxxxbpzx4db
  application: 
    id:          9e1c5e93-xxxxx-198d3581b261
    name:        test
    console:     https://sae.console.aliyun.com/#/AppList/AppDetail?appId=cn-hangzhou:test&regionId=cn-hangzhou&namespaceId=cn-hangzhou:test
    packageType: FatJar
    packageUrl:  https://sae-packages-cn-hangzhou-1976xxxx5242.oss-cn-hangzhou.aliyuncs.com/kEAF6sUck0vLhR8x.jar
    cpu:         500
    memory:      1024
    replicas:    1
  slb: 
    InternetIp: 114.55.2.240
```
通过`slb.InternetIp`的值即可访问应用。

## info
通过 `s info` 指令，根据 application.appName 的值查询已部署的应用。执行结果示例如下：
```
  namespace: 
    id: cn-hangzhou
  vpcConfig: 
    vpcId:           vpc-bp14o0juad2lnhcc7pobl
    vSwitchId:       vsw-bp17mndu8y2hyrmpfg9zr
    securityGroupId: sg-bp1arin5aob5kmbwb6v2
  application: 
    name:              test2
    console:           https://sae.console.aliyun.com/#/AppList/AppDetail?appId=17cfd88b-91b0-407d-b284-17247a522e6c&regionId=cn-hangzhou&namespaceId=undefined
    scaleRuleEnabled:  false
    instances:         1
    appDescription:    
    runningInstances:  1
    appDeletingStatus: false
  slb: 
    InternetIp: 121.196.162.18
```
## remove
通过 `s remove` 指令根据 application.appName 的值删除应用。