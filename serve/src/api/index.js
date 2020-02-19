import Myaxios from './Myaxios'
export const apiLogin= login => Myaxios.post("/login",login)//登录接口