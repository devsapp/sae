## 整体YAML
```
services:
  component-test:
    component: sae-namespace
    props:
      config:
        name: 中文名称 # 默认值: auto create by serverless-devs
        id: cn-hangzhou:test
        description: namespace desc
        vpcConfig: # 选填
          vpcId: vpc-bxxxxc7pobl
          vSwitchId: vsw-bp17xxxxpfg9zr
          securityGroupId: sg-bp1xxxxxpzx4db
      router:
        xxx
      configMap:
        xxx
      secret:
        xxxyy
```
### config 为auto或者对象类型
1. auto: 等价于autoConfig
```
services:
  component-test:
    component: sae-namespace
    props:
      config: auto
```
2. 详细配置
```
services:
  sae-namespace:
    component: sae-namespace
    props:
      config:
        name: 中文名称
        id: cn-hangzhou:test
        description: namespace desc
        vpcConfig: # 选填
          vpcId: vpc-bxxxxc7pobl
          vSwitchId: vsw-bp17xxxxpfg9zr
          securityGroupId: sg-bp1xxxxxpzx4db
```

### router 网关路由


### configMap:  K8s ConfigMap

### secret:  K8s secret

