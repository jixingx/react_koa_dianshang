# 电商系统

## 中台
### 使用框架和技术
使用`nodejs`

1. koa2
2. ~~koa-bodyparser(解决post请求参数)~~ 改换为koa-body(解决post请求参数和上传文件)
3. koa-router(路由模块)
4. koa-static(处理静态资源)
5. koa2-cors(处理跨域)
6. mysql(链接mysql数据库)
7. jsonwebtoken(处理token)
8. koa-jwt(主要提供路有权限控制的功能，它会对需要限制的资源请求进行检查)
9. md5(对密码进行加密)

```
 中台文件为middle，
 进入中台文件先 npm install,
 等模块安装完成，
 在node app.js 启动项目
```


## 接口
`接口在middle/doc文件里，直接打开index.html就能查看`

## 后台
### 框架和技术
1. react
2. antd
3. react-router-dom
4. axios
5. nprogress(请求进度条)
6. redux
7. react-redux
8. redux-thunk
9. redux-devtools-extension
10. screenfull(全屏切换插件)
11. dayjs (时间插件)
12. jsonp(jsonp请求插件)
13. draft-js react-draft-wysiwyg draftjs-to-html (富文本插件)
14. echarts echarts-for-react(图表插件)
15. react-i18next i18next i18next-xhr-backend i18next-browser-languagedetector(语言插件)

```
 后台文件为serve，
 进入后台文件先 npm install,
 等模块安装完成，
 在 npm run start 启动项目
```





## 数据库
`请查看database文件夹里的内容`
