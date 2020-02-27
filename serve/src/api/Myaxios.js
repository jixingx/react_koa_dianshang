import axios from 'axios';
import {message} from 'antd'
import {BASEURL} from '../config/index'
import store from '../redux/store'
import {loginout} from "../redux/actions/login_creators"
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

axios.defaults.baseURL = BASEURL;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
    
    if(store.getState().userInfo.token!==''){
      config.headers.common['Authorization'] = store.getState().userInfo.token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  NProgress.done();
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  NProgress.done();
  //获取错误状态码
  const { status }=error.response;
  if(status===401){//401状态码表示请求要求用户的身份认证
      message.error("用户身份失效，请重新登陆！");
      //调用清楚退出信息方法
      store.dispatch(loginout());
  }else{
    message.error(error.message)
  }
  return new Promise(()=>{});
});


export default axios;