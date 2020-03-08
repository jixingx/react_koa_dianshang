import Myaxios from './Myaxios'
import jsonp from 'jsonp';
export const apiLogin= login => Myaxios.post("/login",login)//登录接口
//天气接口
export const apiWeather=()=>{
    return new Promise((resolve,reject)=>{
        jsonp("https://www.tianqiapi.com/api?version=v6&appid=67136387&appsecret=SFBz5OiB",function(err,data){
            if(!err){
                resolve(data)
            }else{
                reject(new Error("请求失败"))
            }
        })
    })
}

export const apiMenu = () => Myaxios.get('/menu')//菜单接口
export const apiCategory=()=> Myaxios.get('/category/list')//分类列表接口
export const apiCategoryAdd=(categoryName)=>Myaxios.post('/category/add',categoryName)//分类新增接口
export const apiCategoryUpdate=(categoryValue)=>Myaxios.post('/category/update',categoryValue)//分类更新接口
export const apiProductList=(pageNum,pageSize)=> Myaxios.get('/product/list',{params:{pageNum,pageSize}})//获取商品列表
