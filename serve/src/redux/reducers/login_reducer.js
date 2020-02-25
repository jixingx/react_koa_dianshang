import {SVAE_USERINFO,LOGINOUT} from '../action_types'

let _user=JSON.parse(localStorage.getItem('user'))
let _token=localStorage.getItem('token')

let defaultState={
    user:_user || {},
    token:_token || '',
    isLogin:_user&&_token?true:false
} //默认数据

export default (state=defaultState,action)=>{
    const {type,date}=action
    //console.log(action)
    let newState
    switch (type) {
        case SVAE_USERINFO:
            newState={user:date.data,token:date.token,isLogin:true}
            return newState;
        case LOGINOUT:
            newState={user:{},token:'',isLogin:false}
            return newState;
        default:
            return state
    }
}