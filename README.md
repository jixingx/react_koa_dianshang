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
10. koa-multer(上传文件)

### 接口
> 所有接口前置`http://localhost:8080/admin`

登录接口:/login
```
  请求方式:post
  所需参数：username,password
  返回参数：
    1. 成功返回：
        {
            status:0,
            data:qureyDate[0],
            token:"Bearer "+token
        }
    2. 失败返回：
        {
            status:1,
            msg:'用户名或密码错误'
        }
```

分类列表接口:/category/list
```
  请求分时:get
  所需参数：username,password
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:qureyDate
        }
    2. 无数据返回：
        ctx.body={
            status:1,
            data:[]
        }
```

分类列表新增接口:/category/add
```
  请求分时:post
  所需参数：categoryName
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:{
                id:addDate.insertId,
                name:categoryName
            }
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'已有此分类'
        }
        或
        ctx.body={
            status:1,
            msg:'新增分类失败'
        }
```
分类列表更新接口:/category/update
```
  请求分时:post
  所需参数：id,categoryName
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:{
                id:id,
                name:categoryName
            }
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'已有此分类'
        }
        或
        ctx.body={
            status:1,
            msg:'更新分类失败'
        }
```

商品列表接口:/product/list
```
  请求分时:get
  所需参数：pageNum(第几页),pageSize(每页条数)
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:{
                list:qureyDate,
                pageNum:Number(pageNum),
                pageSize:Number(pageSize),
                pages:pages,
                total:total
            }
        }
    2. 无数据返回：
        ctx.body={
            status:1,
            data:{
                list:[],
                pageNum:Number(pageNum),
                pageSize:Number(pageSize),
                pages:0,
                total:0
            }
        }
```

商品搜索接口:/product/search
```
  请求分时:get
  所需参数：productName,productDesc,pageNum(第几页),pageSize(每页条数)
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:{
                list:qureyDate,
                pageNum:Number(pageNum),
                pageSize:Number(pageSize),
                pages:pages,
                total:total
            }
        }
    2. 无数据返回：
        ctx.body={
            status:1,
            data:{
                list:[],
                pageNum:Number(pageNum),
                pageSize:Number(pageSize),
                pages:0,
                total:0
            }
        }
```

商品状态更新接口:/product/search
```
  请求分时:post
  所需参数：productId,status
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:"商品状态更新成功"
        }
    2. 无数据返回：
        ctx.body={
            status:1,
            msg:'商品状态更新失败'
        }
```

商品管理详情接口:/product/detail
```
  请求分时:post
  所需参数：productId,status
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:qureyDate
        }
    2. 无数据返回：
        ctx.body={
            status:1,
            msg:'商品详细获取失败'
        }
```
文件上传接口:/upload
```
  请求分时:post
  所需参数：filename
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:{
                name:filename,
                url:"http://localhost:8080/upload/"+filename
            }
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'上传失败'
        }
```

文件删除接口:/upload
```
  请求分时:post
  所需参数：filename
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:'删除成功'
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'暂无此文件，删除失败'
        }
```

添加商品接口:/product/add
```
  请求分时:post
  所需参数：imgs,name,desc_ribe,price,categoryId,detail
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:'新增成功'
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'新增失败'
        }
```

修改商品管理接口:/product/edit
```
  请求分时:post
  所需参数：id,imgs,name,desc_ribe,price,categoryId,detail
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:"商品修改成功"
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'商品修改失败'
        }
```

角色列表接口:/roles/list
```
  请求分时:get
  所需参数：
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            data:qureyDate
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'获取列表失败'
        }
```

角色添加接口:/roles/add
```
  请求分时:get
  所需参数：
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:"新增成功"
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'新增失败'
        }
```

角色设置权限接口:/roles/update
```
  请求分时:get
  所需参数：
  返回参数：
    1. 成功返回：
        ctx.body={
            status:0,
            msg:"授权成功"
        }
    2. 失败返回：
        ctx.body={
            status:1,
            msg:'授权失败'
        }
```
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



## 数据库
使用`mysql`数据库

数据库名:`xretailers`

1. user表

字段 | 类型 | 描述
-|-|-|
id | int | 主键
username | varchar(30) | 用户名
password | varchar(50) | 密码
create_time | datetime | 创建时间
phone | char(11) | 手机
email | varchar(50) | 邮箱
role_id | int | 权限id

2. products表

字段 | 类型 | 描述
-|-|-|
id | int | 商品主键id
status | int(11) | 商品状态
imgs | varchar(255) | 商品图片
name | varchar(60) | 商品名字
desc_ribe | varchar(255) | 商品描述
price | decimal(12,2) | 商品价格
categoryId | int(11) | 分类id
detail | text | 商品详细

3. categorys表

字段 | 类型 | 描述
-|-|-|
id | int | 分类主键id
name | varchar(30) | 分类名称

4. roles表

字段 | 类型 | 描述
-|-|-|
id | int | 角色权限主键
menus | varchar(255) | 菜单权限
name | varchar(30) | 角色权限名称
create_time | datetime | 创建时间
auth_time | datetime | 授权时间
auth_name | varchar(50) | 授权用户
