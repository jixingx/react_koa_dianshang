//1.引入mysql模块
const mysql=require('mysql');

async function Db(sql){
    const promise=new Promise((resolve, reject)=>{
        //2.链接数据库服务器
        let db=mysql.createConnection({
            host:'localhost',//域名
            port:'3306',//端口
            user:'root',//数据库登录用户名
            password:'root',//数据库登录密码
            database:'xretailers'
        })

        //链接
        db.connect()
        //操作数据库
        db.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
        //关闭连接
        db.end()
    })
    return await promise;
}

module.exports=Db