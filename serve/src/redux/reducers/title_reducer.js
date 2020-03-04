import {SAVE_TITLE} from '../action_types'

let defaultState=''

export default (state=defaultState,action)=>{
    const {type,data}=action
    
    let newState
    switch (type) {
        case SAVE_TITLE:
            newState=data
            return newState
        default:
            return state;
    }
}