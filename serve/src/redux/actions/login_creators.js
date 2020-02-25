import {SVAE_USERINFO,LOGINOUT} from '../action_types'

export const save_userinfo=(value)=>{
    // console.log(value)
    localStorage.setItem('user',JSON.stringify(value.data))
    localStorage.setItem('token',value.token)
    return {type:SVAE_USERINFO,date:value}
}

export const loginout=(value)=>({type:LOGINOUT,data:''})