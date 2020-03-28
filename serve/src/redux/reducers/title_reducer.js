import {SAVE_TITLE,DELETE_TITLE} from '../action_types'

let defaultState=''

export default (state=defaultState,action)=>{
    const {type,data}=action
    
    let newState
    switch (type) {
        case SAVE_TITLE:
            newState=data
            return newState
        case DELETE_TITLE:
            newState="";
            return newState;
        default:
            return state;
    }
}