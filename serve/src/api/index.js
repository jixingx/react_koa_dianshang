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
export const apiProductSearch=(typeSerach,keyWords,pageNum,pageSize)=>Myaxios.get('/product/search',{params:{[typeSerach]:keyWords,pageNum,pageSize}})//获取商品搜索列表
export const apiProductUpdateStatus=(productId,status)=>Myaxios.post('/product/updateStatus',{productId,status})//商品状态更新
export const apiProductDetail=(productId)=>Myaxios.post('/product/detail',{productId})//获取商品详细
export const apiDeleteFile=(name)=>Myaxios.post('/deletefile',{name})//删除文件
export const apiProductAdd=({imgs,name,desc_ribe,price,categoryId,detail})=>Myaxios.post('/product/add',{imgs,name,desc_ribe,price,categoryId,detail})//添加商品
export const apiProductEdit=({id,imgs,name,desc_ribe,price,categoryId,detail})=>Myaxios.post('/product/edit',{id,imgs,name,desc_ribe,price,categoryId,detail})//更新商品
export const apiRolesList=()=> Myaxios.get('/roles/list')//获取角色列表
export const apiRolesAdd=({name})=> Myaxios.post('/roles/add',{name})//添加角色
