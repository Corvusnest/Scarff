# Scarff

Scarff是一个基于Nodejs, Express的Web服务器框架。

提供了基础常用的设置，并使用Handlebars作为模版引擎。独立出了路由，模版。默认配置好了简单的log输出，以此可以快速地开始对于网站的建设。

## 安装

### 安装nodejs

官网: https://nodejs.org/en/

### 克隆scarff文件

```sh
$ git clone git@github.com:Corvusnest/scarff.git
```

### 安装app所需求的包

```sh
$ npm install
```

## 运行

```sh
$ node app.js
```

或者

```sh
$ npm start
```

生产环境请使用持久化方式，比如screen或者forever。

## 配置

配置文件为: settings.js

```sh
// Running Environment (production, development)
runningEnv: 'development',

// using https
https: false,
// if you are using https, you should set the path of ssl/tls key and cert
httpsKey: 'https/key.pem',
httpsCert: 'https/cert.pem',
httpsPassphrase: '[Your passphrase]',

// 80, 443, 3000
port: 3000,

// logger
logger: true,
logFolder: 'log',

// Cookie (Not recommend)
cookie: false,
cookieSecret: '[Your cookie secret]',

// Session
session: false,
sessionSecret: '[Your session secret]',
sessionAge: 1000 * 60 * 60,
```

### runningEnv: 运行环境

默认为开发环境。可以在此配置文件中进行修改。

但系统运行环境中的传参“NODE_ENV”有着最高的优先级。

生产环境运行时需要改为“production”。

### https: 是否使用https

默认为false，使用http。

无论是安全考虑还是作为未来互联网的趋势，都推荐使用https。

使用https需要第三方认证机构颁发证书。否则使用自己的证书会导致用户的浏览器发出安全警告。

使用前必须设置好httpsKey, httpsCert, httpsPassphrase

### port: 端口

默认为开发用的3000。生产环节需根据http或https更改至80或者443。

### logger: 日志

默认为true。

开发环境中日志会直接输出至终端，生产环境会默认按照日期保存在log文件夹中。

### logFolder: 日志保存文件夹

默认: log

### cookie: 是否使用cookie

默认为false，基于安全考虑不推荐使用cookie。应以session取代。

使用时需修改cookieSecret以添加盐值。

### session: 是否使用session

默认为false，使用时需修改sessionSecret以添加盐值。

修改sessionAge以设置session有效时间，默认为3600000（一小时），单位为毫秒。

## 路由

路由存储在routes文件夹中。

_router.js为母文件，添加任何路由需先在其中添加路径。之后再根据路径添加路由文件。

错误捕捉默认为errorCatch.js，可根据需要进行修改。

## 视图

视图文件夹默认为views。

其中_layouts为Handlebars的用于存储布局的文件夹，

_partials为Handlebars的用于存储局部文件的文件夹。

更多关于Handlebars的用法请访问官网: http://handlebarsjs.com/

## 测试

使用Grunt进行单元测试，默认配置好了JSHint
