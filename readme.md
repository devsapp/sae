## 概念说明
### 应用 application
应用 application 是serverles devs cli 的启动对象，包含全局变量,以及服务。 [具体内容查看官方文档](https://github.com/Serverless-Devs/docs/blob/master/zh/yaml.md)
### 组件 component
component 是 serverless devs 执行的主逻辑单元，用户可以在组件里自定义不同的流程处理逻辑。 一个component 可看做是一个npm 包 (类似 java jar)
## 使用说明
本项目是开发 Serverless devs 组件component 的标准模板，提供了日志打印，国际化，以及 文档生成样例。

## 前置条件 
安装最新的s 工具
```
npm i @serverless-devs/s -g
```
检查s版本，对照local 和 remote 是否是最新
```
s -v
```
## 快速开始
### 1.组件下载
```
s init devsapp/start-component // 或者直接s init 后选择最后的Component 选项
```
### 2.安装依赖
```
cd start-component  && npm i 
```
### 3.监听编译
```
npm run watch
```
### 4.执行测试

```
cd example && s test
```

## 编译发布

### 执行编译构建

```
npm run build
```
### 发布到serverless devs平台（建设中） 
```
s cli platform publish // #需要先注册以及登录 serverless devs 平台，如果发布到自己的仓库请忽略此选项
```