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
//获取商品搜索列表
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
router.post('/product/detail',async (ctx)=>{
    try {
        let {productId}=ctx.request.body
        let sql=`SELECT * FROM products WHERE id='${productId}'`;
        let qureyDate=await Dd(sql)
        qureyDate=qureyDate[0]
        qureyDate.imgs=qureyDate.imgs.indexOf(',')>-1?qureyDate.imgs.split(','):qureyDate.imgs.split(' ')
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
router.post('/deletefile',async (ctx)=>{
    try {
        const {name} = ctx.request.body;
        
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

        
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})
module.exports=router