import axios from 'axios';
import {message} from 'antd'
import {BASEURL} from '../config/index'
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

axios.defaults.baseURL = BASEURL;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
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
  message.error(error.message)
  return new Promise(()=>{});
});


export default axios;