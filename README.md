# Lucifer运维平台 #

[![vue](https://img.shields.io/badge/vue-2.4.2-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-1.4.2-brightgreen.svg)](https://github.com/ElemeFE/element)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/itimor/lucifer-frontend/blob/master/LICENSE)

**本项目是lucifer运维平台的前端**

**注意：该项目目前使用element-ui@1.4.2版本，所以最低兼容 Vue 2.3.0**
**该项目不支持低版本游览器(如ie)**


## 功能
- 登录/注销
- 权限验证
- 侧边栏
- 面包屑
- Markdown编辑器
- 列表拖拽
- echarts图表
- 401，404错误页面
- 前端可视化编辑文件保存文件
- table 
- 拖拽table example
- form
- dashboard
- 动态侧边栏（支持多级路由）
- screenfull
- views-tab

## 开发
```bash
    # 克隆项目
    git clone https://github.com/itimor/lucifer-frontend.git

    # 安装依赖
    npm install
   or
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:8080

## 发布
```bash
    # 构建生成环境
    npm run build
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── filtres                // 全局filter
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   ├── routers.js             // 路由
│   └── config.js             // 配置文件

└── static                     // 第三方资源
    └── jquery.min.js          // jquery.min.js
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 效果图

### 登录
![login](https://github.com/itimor/lucifer-frontend/blob/master/gifs/login.gif)

### 执行命令实时查看结果
![cmdrun](https://github.com/itimor/lucifer-frontend/blob/master/gifs/cmdrun.gif)

### 在线部署软件
![soft_install](https://github.com/itimor/lucifer-frontend/blob/master/gifs/soft_install.gif)

### 在线编辑配置
![editfile](https://github.com/itimor/lucifer-frontend/blob/master/gifs/editfile.gif)

## 开发问题
- [x] 图像展示问题解决，
- [x] 前端 `Dialog`弹出框，嵌入 `el-form` 组件时，关闭弹出框，数据还在表单内，数据绑定应该有问题
> 这个感觉是 这个的问题， Object.assign
- [x] dns页面添加
- [x] 前端执行系统命令，尝试用channels，但是目前还没搞明白这东西
- [x] 上传头像，更改头像，头像裁剪组件
- [x] 菜单权限问题，增加一个菜单管理列表，根据用户权限动态显示菜单， 参考:
> 1、 [根据需求动态加载路由](https://blog.yqiu.net/2017/07/06/vue-dynamic-load-router/)

> 2、 [vue-router2.2.0新增特性addRoutes实现路由动态加载，菜单动态加载，运用于后台管理系统，路由数据取自数据库](http://blog.csdn.net/s8460049/article/details/61190709)

- [x] markdown显示问题
- [x] 日期 格式化 过滤
- [x] 提交duty时 上传图片
- [x] 表格全选bug
- [x] 点击图片放大问题