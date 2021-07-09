# 前言

通过该组件，快速通过 SAE 部署demo应用

# 测试

s.yaml

```yaml
edition: 1.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: sae-app           #  项目名称
access: default         #  秘钥别名

services:
  sae-test: #  服务名称
    component:  devsapp/sae
    props:
      Region: cn-beijing
      Namespace:
        NamespaceId: cn-beijing:test
        NamespaceName: name
        NamespaceDescription: namespace desc
      Application:
        AppName: test
        AppDescription: This is a test description.
        Code:
#          Image: registry-vpc.cn-shenzhen.aliyuncs.com/sae-demo-image/consumer:1.0
          Package: https://edas-sh.oss-cn-shanghai.aliyuncs.com/apps/K8S_APP_ID/57ba4361-82aa-4b08-9295-b36b00f0a38e/hello-sae.jar
#          Package:
#            Path: 路径
#            Bucket:
#              Region: 上传的oss地区
#              Name: 上传的oss名字
        Cpu: 500
        Memory: 1024
        Replicas: 1
        AutoConfig: true
      SLB:
        Internet: [{"port":80,"targetPort":8080,"protocol":"TCP"}]
```


# 参数详情

| 参数名 |  必填  |  类型  |  参数描述  |
| --- |  ---  |  ---  |  ---  |
| Region | True | String | 地区 |
| Namespace | True | Struct | 命名空间 |
| Application | True | Struct | 应用配置 |
| SLB | False | Struct | SLB配置 |


## Namespace

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
|NamespaceId	|String	|	是	|cn-beijing:test|	命名空间ID。仅允许小写英文字母和数字。|
|NamespaceName|	String	|	否|	name	|命名空间名称。|
|NamespaceDescription	|String	|	否|	desc	|命名空间描述信息。|

## Application

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
|AppName|	String	|	是|	test	| 应用名称。允许数字、字母以及短划线（-）组合。必须以字母开始，不超过36个字符。|
|NamespaceId|	String|		否|	cn-beijing:test	|SAE命名空间ID。仅支持名称为小写字母加短划线（-）的命名空间，必须以字母开始。命名空间可通过调用DescribeNamespaceList接口获取。|
|AppDescription	|String	|	否	|This is a test description.	|应用描述信息。不超过1024个字符。|
|Code|Struct|是|-|代码|
|VpcId	|String	|	否|	vpc-bp1aevy8sofi8mh1q****	|SAE命名空间对应的VPC。在SAE中，一个命名空间只能对应一个VPC，且不能修改。第一次在命名空间内创建SAE应用将形成绑定关系。多个命名空间可以对应一个VPC。不填则默认为命名空间绑定的VPC ID。|
|VSwitchId|	String	|	否|	vsw-bp12mw1f8k3jgygk9****	|应用实例弹性网卡所在的虚拟交换机。该交换机必须位于上述VPC内。该交换机与SAE命名空间同样存在绑定关系。不填则默认为命名空间绑定的vSwitch ID。|
|PackageVersion	|String	|	否	|1.0.0	|部署包的版本号。当Package Type为War和FatJar时必填。|
|Cpu|	Integer	|	否	|1000	| 每个实例所需的CPU，单位为毫核，不能为0。目前仅支持以下固定规格：<br>500<br>1000<br>2000<br>4000<br>8000<br>16000<br>32000|
|Memory|	Integer	|	否	|1024	|每个实例所需的内存，单位为MB，不能为0。与CPU为一一对应关系，目前仅支持以下固定规格：<br>1024：对应CPU为500毫核。<br>2048：对应CPU为500和1000毫核。<br>4096：对应CPU为1000和2000毫核。<br>8192：对应CPU为2000和4000毫核。<br>16384：对应CPU为4000和8000毫核。<br>32768：对应CPU为16000毫核。<br>65536：对应CPU为8000、16000和32000毫核。<br>131072：对应CPU为32000毫核。|
|Replicas|	Integer	|	是	|1	|初始实例数。|
|Command|	String		|否|	sleep	|镜像启动命令。该命令必须为容器内存在的可执行的对象。例如：sleep。设置该命令将导致镜像原本的启动命令失效。|
|CommandArgs	|String	|	否|	1d	|镜像启动命令参数。上述启动命令所需参数。例如：1d|
|Envs|	String	|	否	|[{"name":"envtmp","value":"0"}]	|容器环境变量参数。|
|CustomHostAlias	|String	|	否	|[{"hostName":"samplehost","ip":"127.0.0.1"}]	|容器内自定义host映射。|
|JarStartOptions	|String	|	否	|-Xms4G -Xmx4G	|JAR包启动应用选项。应用默认启动命令：$JAVA_HOME/bin/java $JarStartOptions -jar $CATALINA_OPTS "$package_path" $JarStartArgs|
|JarStartArgs	|String	|	否	|custom-args	|JAR包启动应用参数。应用默认启动命令：$JAVA_HOME/bin/java $JarStartOptions -jar $CATALINA_OPTS "$package_path" $JarStartArgs|
|Liveness|	String	|	否	|{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}	|容器健康检查，健康检查失败的容器将被关闭并恢复。目前仅支持容器内下发命令的方式。例如：{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}<br>command：设置健康检查命令。<br>initialDelaySeconds：设置健康检查延迟检测时间，单位为秒。<br>periodSeconds：设置健康检查周期，单位为秒。<br>timeoutSeconds：设置健康检查超时等待时间，单位为秒。|
|Readiness	|String|		否|	{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}	|应用启动状态检查，多次健康检查失败的容器将被关闭并重启。不通过健康检查的容器将不会有SLB流量进入。例如：{"exec":{"command":["sh","-c","cat /home/admin/start.sh"]},"initialDelaySeconds":30,"periodSeconds":30,"timeoutSeconds":2}<br>command：设置健康检查命令。<br>initialDelaySeconds：设置健康检查延迟检测时间，单位为秒。<br>periodSeconds：设置健康检查周期，单位为秒。<br>timeoutSeconds：设置健康检查超时等待时间，单位为秒。|
|Deploy|	Boolean	|	否	|true|	是否立即部署。取值说明如下：<br>true：立即部署。<br>false：默认值，稍后部署。|
|EdasContainerVersion	|String	|	否|	3.5.3	|Pandora应用使用的运行环境。|
|Timezone|	String	|	否|	Asia/Shanghai	|时区默认为Asia/Shanghai。|
|SlsConfigs|	String|		否	|[{\"logDir\":\"/root/logs/hsf.log\"}]	|文件日志采集配置。<br>使用SAE自动创建的SLS资源：[{\"logDir\":\"/root/logs/hsf.log\"}]。<br>使用自定义的SLS资源：[{\"projectName\":\"test-sls\",\"logDir\":\"/tmp/readiness.txt\",\"logstoreName\":\"logstore\","logtailName":"testLogtail"}]。<br>projectName：配置SLS上的Project名称。<br>logDir：配置收集日志文件的路径。<br>logstoreName：配置SLS上的Logstore名称。<br>logtailName：配置SLS上的Logtail名称，如果不指定，则表示新建Logtail。|
|NasId|String	|	否|	KSAK****	|挂载的NAS的ID，必须与集群处在同一个地域。它必须有可用的挂载点创建额度，或者其挂载点已经在VPC内的交换机上。如果不填，且存在mountDescs字段，则默认将自动购买一个NAS并挂载至VPC内的交换机上。|
|MountHost|	String	|	否|	example.com	|NAS在应用VPC内的挂载点。|
|MountDesc	|String	|	否|	[{MountPath: "/tmp", NasPath: "/"}]	|挂载描述。|
|PreStop|	String	|	否	|{"exec":{"command":["cat","/etc/group"]}}	|停止前执行脚本，格式如：{"exec":{"command":["cat","/etc/group"]}}|
|PostStart	|String	|	否	|{"exec":{"command":["cat","/etc/group"]}}	|启动后执行脚本，格式如：{"exec":{"command":["cat","/etc/group"]}}|
|WarStartOptions	|String	|	否	|custom-option	|WAR包启动应用选项。应用默认启动命令：java $JAVA_OPTS $CATALINA_OPTS [-Options] org.apache.catalina.startup.Bootstrap "$@" start|
|ConfigMapMountDesc|	String	|否	|[{"configMapId":16,"key":"test","mountPath":"/tmp"}]	|ConfigMap挂载描述。|
|SecurityGroupId|	String	|	否	|sg-wz969ngg2e49q5i4****	|安全组ID。|
|AutoConfig|	Boolean	|	否|	true	|是否自动配置网络环境。取值说明如下：<br>true：创建应用时SAE自动配置网络环境。NamespaceId、VpcId、vSwitchId和SecurityGroupId的取值将被忽略。<br>false：创建应用时SAE手动配置网络环境。<br>TerminationGracePeriodSeconds	Integer	Query	否	30	<br>优雅下线超时时间，默认为30，单位为秒。取值范围为1~60。|
|PhpArmsConfigLocation	|String	|	否|	/usr/local/etc/php/conf.d/arms.ini	|PHP应用监控挂载路径，需要您保证PHP服务器一定会加载这个路径的配置文件。<br>您无需关注配置内容，SAE会自动渲染正确的配置文件。|
|PhpConfigLocation	|String	|	否|	/usr/local/etc/php/php.ini	|PHP应用启动配置挂载路径，需要您保证PHP服务器会使用这个配置文件启动。|
|PhpConfig|	String	|	否	|k1=v1	|PHP配置文件内容。|
|TomcatConfig	|String	|	否	|{"useDefaultConfig":false,"contextInputType":"custom","contextPath":"hello","httpPort":8088,"maxThreads":400,"uriEncoding":"UTF-8","useBodyEncoding":true,"useAdvancedServerXml":false}|Tomcat文件配置，设置为""或"{}"表示删除配置：<br><br>useDefaultConfig：是否使用自定义配置，若为true，则表示不使用自定义配置；若为false，则表示使用自定义配置。若不使用自定义配置，则下面的参数配置将不会生效。<br>contextInputType：选择应用的访问路径。<br>war：无需填写自定义路径，应用的访问路径是WAR包名称。<br>root：无需填写自定义路径，应用的访问路径是/。<br>custom：需要在下面的自定义路径中填写自定义的路径。<br>contextPath：自定义路径，当contextInputType类型为custom时，才需要配置此参数。<br>httpPort：端口范围为1024~65535，小于1024的端口需要Root权限才能操作。因为容器配置的是Admin权限，所以请填写大于1024的端口。如果不配置，则默认为8080。<br>maxThreads：配置连接池的连接数大小，默认大小是400。<br>uriEncoding：Tomcat的编码格式，包括UTF-8、ISO-8859-1、GBK和GB2312。如果不设置则默认为ISO-8859-1。<br>useBodyEncoding：是否使用BodyEncoding for URL。<br>AcrAssumeRoleArn	String	Query	否	acs:ram::123456789012****:role/adminrole	<br>跨账号拉取镜像时所需的RAM角色的ARN。|
|OssMountDescs	|String	|	否	|[{"bucketName": "oss-bucket", "bucketPath": "data/user.data", "mountPath": "/usr/data/user.data", "readOnly": true}]	|OSS挂载描述信息。|
|OssAkId|	String|	否	|xxxxxx	|OSS读写的AccessKey ID。|
|OssAkSecret|	String	|	否	|xxxxxx	|OSS读写的AccessKey Secret|


### 代码配置

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
| Image | String  |  否  |  registry-vpc.cn-shenzhen.aliyuncs.com/sae-demo-image/consumer:1.0  |   镜像地址  |
| Package |  String/Struct  |  否  |  https://edas-sh.oss-cn-shanghai.aliyuncs.com/apps/K8S_APP_ID/57ba4361-82aa-4b08-9295-b36b00f0a38e/hello-sae.jar  |   代码包  |

当Package为Struct时：

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
| Path | String  |  是  |  ./abc.jar  |   路径  |
| Bucket | Struct  |  否  |  -  |   对象存储配置  |

Bucket如果被指定时：

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
| Region | String  |  是  |  cn-hangzhou  |   上传的oss地区  |
| Name | Struct  |  是  |  test  |   上传的oss名字  |


## SLB

| 名称 |  类型  |  是否必选  |  示例值  |   描述  |
| --- |  ---  |  ---  |  ---  | ---  |
|Internet	|String	|	是	|[{"port":80,"targetPort":8080,"protocol":"TCP"}]|	绑定公网SLB。例如：[{"port":80,"targetPort":8080,"protocol":"TCP"}]，表示将容器的8080端口通过SLB的80端口暴露服务，协议为TCP。|
|Intranet|	String	|	否|	[{"port":80,"targetPort":8080,"protocol":"TCP"}]	|绑定私网SLB。例如：[{"port":80,"targetPort":8080,"protocol":"TCP"}]，表示将容器的8080端口通过SLB的80端口暴露服务，协议为TCP。|
|InternetSlbId	|String	|	否|	lb-bp1tg0k6d9nqaw7l1****	|使用指定的已购买的公网SLB，目前只支持非共享型实例。|
|IntranetSlbId	|String	|	否|	lb-bp1tg0k6d9nqaw7l1****	|使用指定的已购买的私网SLB，目前只支持非共享型实例。|