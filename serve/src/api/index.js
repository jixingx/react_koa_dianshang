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
export const apiCategory=()=> Myaxios.get('/category/list')//分类接口