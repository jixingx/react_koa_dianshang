//引入koa-router
const Router=require('koa-router');
const router=new Router();
//引入Db函数，连接mysql
const Dd=require('../model/Db')
//引入jsonwebtoken模块
const jwt=require('jsonwebtoken')
//引入md5模块
const md5=require('md5');
//引入fs模块
const fs=require('fs');
//引入path模块
const path=require('path');

//登录接口
/** 
* @api {post} /login 登录接口
* @apiName login
* @apiGroup User
* 
* @apiParam (Request) {String{5..30}} username 用户名
* @apiParam (Request) {String{6..30}} password 密码
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 用户详细数据
* @apiSuccess {String} token 用户认证码
* @apiSuccess {String} msg status为1时,返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": qureyDate[0],
*     "token":"Bearer "+token
*   }
*   or
*   {
*     "status": 1,
*     "msg":'用户名或密码错误'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/login',async (ctx)=>{
    try {
        let {username,password}=ctx.request.body
        let mdPsd=md5(md5(password))
        //console.log(userName,password)
        let sql=`SELECT id,username,create_time,phone,email,role_id FROM user WHERE username='${username}' AND password='${mdPsd}'`;
        let qureyDate=await Dd(sql)
        //console.log(qureyDate)
        if(qureyDate.length>0){
            let rule={id:qureyDate[0].id,userName:qureyDate[0].userName}
            /**
             * 签名方法:jwt.sign(payload, secretOrPrivateKey, [options, callback])
                payload 是一个json对象或者是一个可以json化的buffer或字符串 这个对象可以存储用户id,会话信息等,这里的信息都是可以使用jwt.verify()方法拿到的. 
                secretOrPrivateKey是加密的key或者叫做密匙,不知道密匙是无法解析payload参数的.
                options 参数 是一个json对象
                expiresIn : 表示有效期  不带单位默认为秒  如带单位如: "2 days", "10h", "7d"
                还有很多参数设置,具体请查看官文
                * 
                */
            //jwt.sign("规则","加密名字","过期时间","箭头函数")
            let token=jwt.sign(rule,"secret",{expiresIn:'7d'})
            ctx.body={
                status:0,
                data:qureyDate[0],
                token:"Bearer "+token
            }
        }else{
            ctx.body={
                status:1,
                msg:'用户名或密码错误'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
    
})

//获取分类列表接口
/** 
* @api {get} /category/list 分类列表接口
* @apiName Getcategory
* @apiGroup Category
* 
* @apiParamExample {json} Request:
*   无请求参数
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 商品分类全部数据(status为1时，data为:[])
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": qureyDate
*   }
*   or
*   {
*     "status": 1,
*     "data":[]
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.get("/category/list",async (ctx)=>{
    try {
        let sql=`SELECT * FROM categorys`;
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
            ctx.body={
                status:0,
                data:qureyDate
            }
        }else{
            ctx.body={
                status:1,
                data:[]
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//分类商品新增
/** 
* @api {post} /category/add 分类商品新增接口
* @apiName Addcategory
* @apiGroup Category
* 
* @apiParam (Request) {String} categoryName 商品分类名称
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 新增的商品分类数据
* @apiSuccess {String} msg status为1时,返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 1,
*     "msg":'已有此分类'
*   }
*   or
*   {
*     "status":0,
*     "data":{
*        id:4,
*        name:男士背包
*     }
*   }
*   or
*   {
*      "status": 1,
*      "msg":'新增分类失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/category/add',async (ctx)=>{
    try {
        let {categoryName}=ctx.request.body
        let sql=`SELECT * FROM categorys WHERE name='${categoryName}'`;
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
            ctx.body={
                status:1,
                msg:'已有此分类'
            }
        }else{
            sql=`INSERT INTO categorys VALUES(null,'${categoryName}')`;
            let addDate=await Dd(sql)
            if(addDate.affectedRows>0){
                ctx.body={
                    status:0,
                    data:{
                        id:addDate.insertId,
                        name:categoryName
                    }
                }
            }else{
                ctx.body={
                    status:1,
                    msg:'新增分类失败'
                }
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//分类商品更新
/** 
* @api {post} /category/update 分类商品修改接口
* @apiName Updatecategory
* @apiGroup Category
* 
* @apiParam (Request) {Number} id 商品id
* @apiParam (Request) {String} categoryName 商品分类名称
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 修改的分类商品数据
* @apiSuccess {String} msg status为1时,返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 1,
*     "msg":'已有此分类'
*   }
*   or
*   {
*     "status":0,
*     "data":{
*        id:4,
*        name:女士背包
*     }
*   }
*   or
*   {
*      "status": 1,
*      "msg":'更新分类失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/category/update',async (ctx)=>{
    try {
        let {id,categoryName}=ctx.request.body
        let sql=`SELECT * FROM categorys WHERE name='${categoryName}'`;
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
            ctx.body={
                status:1,
                msg:'已有此分类'
            }
        }else{
            let sql=`UPDATE categorys SET name='${categoryName}' WHERE id=${id}`;
            let updateDate=await Dd(sql)
            if(updateDate.affectedRows>0){
                ctx.body={
                    status:0,
                    data:{
                        id:id,
                        name:categoryName
                    }
                }
            }else{
                ctx.body={
                    status:1,
                    msg:'更新分类失败'
                }
            }
        }
        
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//获取商品列表
/** 
* @api {get} /product/list 商品列表接口
* @apiName Getproduct
* @apiGroup Product
* 
* @apiParam (Request) {Number} pageNum 页码
* @apiParam (Request) {Number} pageSize 每页条数
* @apiParamExample {json} Request:
*   {
*       "pageNum":1,
*       "pageSize":10
*   }
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 商品全部数据(status为1时，data为:[])
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": {
*           "list":[{id:1,name:"苹果"}...],//商品列表数据
*           "pageNum":1,//页码
*           "pageSize":10,//每页条数
*           "pages":20,//页数
*           "total":50.//总条数
*      }
*   }
*   or
*   {
*     "status": 1,
*     "data": {
*           "list":[],//空列表
*           "pageNum":0,//页码
*           "pageSize":0,//每页条数
*           "pages":0,//页数
*           "total":0.//总条数
*     }
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.get("/product/list",async (ctx)=>{
    try {
        let {pageNum,pageSize}=ctx.request.query
        let sql=`SELECT count(*) FROM products`;//获取总条数
        let total=await Dd(sql)
        total=total[0]['count(*)'];//获取总条数
        //获取有多少页
        let pages=Math.ceil(total/pageSize)
        //分页开始的位置
        let startTol=(pageNum-1)*pageSize
        sql=`SELECT * FROM products limit ${startTol},${pageSize}`
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
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
        }else{
            ctx.body={
                status:1,
                data:{
                    list:[],
                    pageNum:0,
                    pageSize:0,
                    pages:0,
                    total:0
                }
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//获取商品搜索列表
/** 
* @api {get} /product/search 商品列表查询接口
* @apiName Searchproduct
* @apiGroup Product
* 
* @apiParam (Request) {Number} pageNum 页码
* @apiParam (Request) {Number} pageSize 每页条数
* @apiParam (Request) {String} productName 商品名称
* @apiParam (Request) {String} productDesc 商品详细
* @apiParamExample {json} Request:
*   {
*       "pageNum":1,
*       "pageSize":10,
*       "productName":"",
*       "productDesc":""
*   }
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 商品全部数据(status为1时，data为:[])
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": {
*           "list":[{id:1,name:"苹果"}...],//商品列表数据
*           "pageNum":1,//页码
*           "pageSize":10,//每页条数
*           "pages":20,//页数
*           "total":50.//总条数
*      }
*   }
*   or
*   {
*     "status": 1,
*     "data": {
*           "list":[],//空列表
*           "pageNum":0,//页码
*           "pageSize":0,//每页条数
*           "pages":0,//页数
*           "total":0.//总条数
*     }
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.get("/product/search",async (ctx)=>{
    try {
        let {productName,productDesc,pageNum,pageSize}=ctx.request.query
        let sql;
        if(productName){
            sql=`SELECT count(*) FROM products WHERE name LIKE '%${productName}%'`;//获取总条数
        }else if(productDesc){
            sql=`SELECT count(*) FROM products WHERE desc_ribe LIKE '%${productDesc}%'`;//获取总条数
        }else{
            sql=`SELECT count(*) FROM products`;//获取总条数
        }
        let total=await Dd(sql)
        total=total[0]['count(*)'];//获取总条数
        //获取有多少页
        let pages=Math.ceil(total/pageSize)
        //分页开始的位置
        let startTol=(pageNum-1)*pageSize
        if(productName){
            sql=`SELECT * FROM products WHERE name LIKE '%${productName}%' LIMIT ${startTol},${pageSize}`
        }else if(productDesc){
            sql=`SELECT * FROM products WHERE desc_ribe LIKE '%${productDesc}%' LIMIT ${startTol},${pageSize}`
        }else{
            sql=`SELECT * FROM products limit ${startTol},${pageSize}`
        }
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
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
        }else{
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
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//更改商品状态
/** 
* @api {post} /product/updateStatus 更改商品状态接口
* @apiName UpdateStatusProduct
* @apiGroup Product
* 
* @apiParam (Request) {Number} productId 商品id
* @apiParam (Request) {Number} status 商品状态（1为上架，2为下架）
* @apiParamExample {json} Request:
*   {
*       "productId":1,
*       "status":1
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"商品状态更新成功"
*   }
*   or
*   {
*      "status": 0,
*      "msg":'商品状态更新失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/product/updateStatus',async (ctx)=>{
    try {
        let {productId,status}=ctx.request.body
        let sql=`UPDATE products SET status='${status}' WHERE id=${productId}`;
        let updateStatus=await Dd(sql)
        if(updateStatus.affectedRows>0){
            ctx.body={
                status:0,
                msg:"商品状态更新成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'商品状态更新失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//获取商品详细接口
/** 
* @api {post} /product/detail 获取商品详细接口
* @apiName DetailProduct
* @apiGroup Product
* 
* @apiParam (Request) {Number} productId 商品ID
* @apiParamExample {json} Request:
*   {
*       "productId":1
*   }
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 商品详细数据
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": {商品详细对象数据}
*   }
*   or
*   {
*     "status": 1,
*     "msg":'商品详细获取失败'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/product/detail',async (ctx)=>{
    try {
        let {productId}=ctx.request.body
        let sql=`SELECT * FROM products WHERE id='${productId}'`;
        let qureyDate=await Dd(sql)
        qureyDate=qureyDate[0]
        if(qureyDate.imgs){
            qureyDate.imgs=qureyDate.imgs.indexOf(',')>-1?qureyDate.imgs.split(','):qureyDate.imgs.split()
        }else{
            qureyDate.imgs=[]
        }
        
        if(qureyDate){
            ctx.body={
                status:0,
                data:qureyDate
            }
        }else{
            ctx.body={
                status:1,
                msg:'商品详细获取失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//图片上传功能
/** 
* @api {post} /upload 文件上传接口
* @apiName FileUpload
* @apiGroup File
* 
* @apiParam (Request) {String} file 二进制流
* @apiParamExample {Object} Request:
*   {
*       "file":二进制文件流
*   }
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Object} data 文件名称和地址
* @apiSuccess {msg} msg 上传返回文字通知
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": {
*           "name":filename,
*           "url":"http://localhost:8080/upload/"+filename
*     }
*   }
*   or
*   {
*     "status": 1,
*     "msg":'上传失败'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       code:500,
*       msg:error
*   }
*/
router.post('/upload',async (ctx)=>{
    try {
        // 上传单个文件 
        const file = ctx.request.files.filename; 
        if(file.name){
            //console.log(file)
            // 获取上传文件 
            // 创建可读流 
            const reader = fs.createReadStream(file.path);
            let names=file.name.split('.')
            let filename=Date.now()+"."+names[names.length-1];
            //console.log(filename)
            let filePath = path.join(__dirname, '../static/upload') + `/${filename}`;
            
            // 创建可写流 
            const upStream = fs.createWriteStream(filePath); 
            // 可读流通过管道写入可写流 
            reader.pipe(upStream); 
            ctx.body={
                status:0,
                data:{
                    name:filename,
                    url:"http://localhost:8080/upload/"+filename
                }
            }
        }else{
            ctx.body={
                status:1,
                msg:'上传失败'
            }
        }
        // 上传多个文件
        // const files = ctx.request.files.file; // 获取上传文件
        // for (let file of files) {
        //     // 创建可读流
        //     const reader = fs.createReadStream(file.path);
        //     // 获取上传文件扩展名
        //     let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
        //     // 创建可写流
        //     const upStream = fs.createWriteStream(filePath);
        //     // 可读流通过管道写入可写流
        //     reader.pipe(upStream);
        // }

    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//删除文件接口
/** 
* @api {post} /deletefile 删除文件接口
* @apiName FileDeletefile
* @apiGroup File
* 
* @apiParam (Request) {String} name 文件名称
* @apiParamExample {Object} Request:
*   {
*       "name":文件名称
*   }
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 删除信息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "mag": '删除成功'
*   }
*   or
*   {
*     "status": 1,
*     "msg":'暂无此文件删除失败'
*   }
*   or
*   {
*     "status": 1,
*     "msg":'商品删除失败'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       code:500,
*       msg:error
*   }
*/
router.post('/deletefile',async (ctx)=>{
    try {
        const {name} = ctx.request.body;
        let sql=`SELECT id,imgs from products WHERE imgs LIKE '%${name}%'`;
        let queryImgs=await Dd(sql)
        arrImgs=queryImgs[0].imgs.indexOf(',')>-1?queryImgs[0].imgs.split(','):queryImgs[0].imgs.split(' ')
        let imgIndex=arrImgs.indexOf(name);
        
        arrImgs.splice(imgIndex,1)
        let imgs=arrImgs?arrImgs.join(','):arrImgs.join('')
        console.log(imgs)
        sql=`UPDATE products SET imgs='${imgs}' WHERE id=${queryImgs[0].id}`
        let updateImgs=await Dd(sql)
        if(updateImgs.affectedRows>0){
            let files=fs.readdirSync('static/upload')
            let file=files.find((item)=>{
                return item==name;
            })
            if(file){
                fs.unlinkSync('static/upload/'+file)
                ctx.body={
                    status:0,
                    msg:'删除成功'
                }
            }else{
                ctx.body={
                    status:1,
                    msg:'暂无此文件删除失败'
                }
            }
        }else{
            ctx.body={
                status:1,
                msg:'商品删除失败'
            }
        }
        

        
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//添加商品详细接口
/** 
* @api {post} /product/add 添加商品详细接口
* @apiName AddProduct
* @apiGroup Product
* 
* @apiParam (Request) {String} imgs 图片路径
* @apiParam (Request) {String} desc_ribe 商品简介
* @apiParam (Request) {Number} price 商品价格
* @apiParam (Request) {Number} categoryId 商品分类ID
* @apiParam (Request) {String} detail 商品详细
* @apiParamExample {Object} Request:
*   {
*       "imgs":"",
*       "desc_ribe":"",
*       "price":0,
*       "categoryId":1,
*       "detail":"",
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"新增成功"
*   }
*   or
*   {
*      "status": 1,
*      "msg":'新增失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/product/add',async (ctx)=>{
    try {
        let {imgs,name,desc_ribe,price,categoryId,detail}=ctx.request.body
        let sql=`INSERT INTO products VALUES(null,1,'${imgs}','${name}','${desc_ribe}',${price},${categoryId},'${detail}')`;
        let addData=await Dd(sql)
        if(addData.affectedRows>0){
            ctx.body={
                status:0,
                msg:"新增成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'新增失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//修改商品管理
/** 
* @api {post} /product/edit 修改商品详细接口
* @apiName EditProduct
* @apiGroup Product
*
* @apiParam (Request) {Number} id 商品详细ID
* @apiParam (Request) {String} imgs 图片路径
* @apiParam (Request) {String} desc_ribe 商品简介
* @apiParam (Request) {Number} price 商品价格
* @apiParam (Request) {Number} categoryId 商品分类ID
* @apiParam (Request) {String} detail 商品详细
* @apiParamExample {Object} Request:
*   {
*       "imgs":"",
*       "id":1,
*       "desc_ribe":"",
*       "price":0,
*       "categoryId":1,
*       "detail":"",
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"商品修改成功"
*   }
*   or
*   {
*      "status": 1,
*      "msg":'商品修改失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/product/edit',async (ctx)=>{
    try {
        let {id,imgs,name,desc_ribe,price,categoryId,detail}=ctx.request.body
        let sql=`UPDATE products SET imgs='${imgs}',name='${name}',desc_ribe='${desc_ribe}',price=${price},categoryId=${categoryId},detail='${detail}' WHERE id=${id}`
        
        let updateData=await Dd(sql);
        
        if(updateData.affectedRows>0){
            ctx.body={
                status:0,
                msg:"商品修改成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'商品修改失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//获取角色列表接口
/** 
* @api {get} /roles/list 角色列表接口
* @apiName ListRoles
* @apiGroup Roles
* 

* @apiParamExample Request:
*   无
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Array} data 角色全部数据
* @apiSuccess {String} msg 返回信息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": []
*   }
*   or
*   {
*     "status": 1,
*     "msg": '获取列表失败'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.get("/roles/list",async (ctx)=>{
    try {
        let sql=`SELECT * FROM roles`;
        let qureyDate=await Dd(sql)
        
        if(qureyDate.length>0){
            ctx.body={
                status:0,
                data:qureyDate
            }
        }else{
            ctx.body={
                status:1,
                msg:'获取列表失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//添加角色接口
/** 
* @api {post} /roles/add 添加角色接口
* @apiName AddRoles
* @apiGroup Roles
* 
* @apiParam (Request) {String} name 角色名称
* @apiParamExample {Object} Request:
*   {
*       "name":"",
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"新增成功"
*   }
*   or
*   {
*      "status": 1,
*      "msg":'新增失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/roles/add',async (ctx)=>{
    try {
        let {name}=ctx.request.body
        let sql=`INSERT INTO roles (id,name,create_time) VALUES(null,'${name}',now())`;
        let addData=await Dd(sql)
        if(addData.affectedRows>0){
            ctx.body={
                status:0,
                msg:"新增成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'新增失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//角色授权
/** 
* @api {post} /roles/update 角色授权接口
* @apiName EditRoles
* @apiGroup Roles
*
* @apiParam (Request) {Number} id 角色ID
* @apiParam (Request) {String} menus 角色授权的菜单
* @apiParam (Request) {String} auth_name 授权的用户名
* @apiParamExample {Object} Request:
*   {
*       "id":1,
*       "menus":"/home,/user",
*       "price":"zhangsan"
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"授权成功"
*   }
*   or
*   {
*      "status": 1,
*      "msg":'授权失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/roles/update',async (ctx)=>{
    try {
        let {id,menus,auth_name}=ctx.request.body
        let sql=`UPDATE roles SET menus='${menus}',auth_name='${auth_name}',auth_time=now() WHERE id=${id}`
        
        let updateData=await Dd(sql);
        
        if(updateData.affectedRows>0){
            ctx.body={
                status:0,
                msg:"授权成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'授权失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//获取用户列表接口
/** 
* @api {get} /users/list 获取用户列表接口
* @apiName ListUsers
* @apiGroup User
* 

* @apiParamExample Request:
*   无
* 
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Array} data 用户全部数据
* @apiSuccess {String} msg 返回信息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status": 0,
*     "data": {
*            roles:[角色信息],
*            users:[用户信息]
*     }
*   }
*   or
*   {
*     "status": 1,
*     "msg": '获取列表失败'
*   }
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.get("/users/list",async (ctx)=>{
    try {
        let sql=`SELECT * FROM roles`;
        let qureyRolesData=await Dd(sql)
        sql=`SELECT * FROM user`;
        let qureyUsersData=await Dd(sql)
        let resultUserDate=qureyUsersData.filter((item)=>{
            return item.username!="admin"
        })
        if(qureyUsersData.length>0){
            ctx.body={
                status:0,
                data:{
                    roles:qureyRolesData,
                    users:resultUserDate
                }
            }
        }else{
            ctx.body={
                status:1,
                msg:'获取列表失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//添加用户接口
/** 
* @api {post} /users/add 添加用户接口
* @apiName AddUsers
* @apiGroup User
* 
* @apiParam (Request) {String} username 用户名称
* @apiParam (Request) {String} password 用户密码
* @apiParam (Request) {String} phone 手机号码
* @apiParam (Request) {String} email 邮箱
* @apiParam (Request) {Number} role_id 角色id
* @apiParamExample {Object} Request:
*   {
*       "username":"",
*       "password":"",
*       "phone":"",
*       "email":"",
*       "role_id":1,
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "msg":"新增成功"
*   }
*   or
*   {
*      "status": 1,
*      "msg":'新增失败'
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/users/add',async (ctx)=>{
    try {
        let {username,password,phone,email,role_id}=ctx.request.body
        password=md5(md5(password))
        let sql=`INSERT INTO user VALUES(null,'${username}','${password}',now(),'${phone}','${email}',${role_id})`;
        let addData=await Dd(sql)
        if(addData.affectedRows>0){
            ctx.body={
                status:0,
                msg:"新增成功"
            }
        }else{
            ctx.body={
                status:1,
                msg:'新增失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
//查询角色接口
/** 
* @api {post} /roles/serach 查询角色接口
* @apiName SerachRoles
* @apiGroup Roles
*
* @apiParam (Request) {Number} role_id 角色ID
* @apiParamExample {Object} Request:
*   {
*       "role_id":1
*   }
* 
* @apiSuccess {Number} status 0为成功，1为失败
* @apiSuccess {Array} data 角色菜单数组
* @apiSuccess {String} msg 返回的消息
* @apiSuccessExample {json} Success-Response:
*   {
*     "status":0,
*     "data":['/home','/user']
*   }
*   or
*   {
*      "status": 1,
*      "msg":'菜单规划失败'
*   }  
*   or
*   {
*      "status": 0,
*      "msg":[]
*   }  
*
* @apiError (Error 500) {Number} code 500状态码
* @apiError (Error 500) {String} msg 错误信息
* @apiErrorExample {json} Error-Response:
*   {
*       "code":500,
*       "msg":error
*   }
*/
router.post('/roles/serach',async (ctx)=>{
    try {
        let {role_id}=ctx.request.body
        if(role_id){
            let sql=`SELECT menus FROM roles WHERE id=${role_id}`;
            let qureyRolesData=await Dd(sql)
            //console.log(qureyRolesData[0].menus)
            if(qureyRolesData[0].menus){
                let data;
                data=qureyRolesData[0].menus.indexOf(',')>-1?qureyRolesData[0].menus.split(','):qureyRolesData[0].menus.split(' ')
                ctx.body={
                    status:0,
                    data:data
                }
            }else{
                ctx.body={
                    status:1,
                    msg:'菜单规划失败'
                } 
            }
        }else{
            ctx.body={
                status:0,
                data:[]
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
module.exports=router