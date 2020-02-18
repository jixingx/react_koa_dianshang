const Koa=require('koa');
const app=new Koa();

//引入koa2-cors，设置跨域
const cors=require('koa2-cors');
app.use(cors())

//引入koa-bodyparser，解决post请求
const bodyParser=require('koa-bodyparser');
app.use(bodyParser());

//引入koa-static,处理静态资源
const path=require('path');
const static=require('koa-static')
const staticPath='./static'
app.use(static(path.join(__dirname,staticPath)));

//koa-jwt 主要提供路有权限控制的功能，它会对需要限制的资源请求进行检查
const jwtKoa = require('koa-jwt')
app.use(jwtKoa({secret:"secret"}).unless({//第一个参数密匙，第二个参数那些URL不需要验证
    path: [
        /^\/admin\/login/,
        // /^\/default\/getTypeInfo/,
        // /^\/default\/getArticleList/,
        // /^\/default\/getArticleById/
    ] //数组中的路径不需要通过jwt验证
}))

//引入koa-router，处理路由
const Router=require('koa-router');
const router=new Router()

//引入自定义路由配置
const admin=require('./router/admin')

//配置路由
router.use('/admin',admin.routes());

app.use(router.routes())//挂载router方法





app.listen(8080);