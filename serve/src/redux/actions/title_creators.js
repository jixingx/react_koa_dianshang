import {SAVE_TITLE,DELETE_TITLE} from '../action_types'

export const save_title=(data)=>({type:SAVE_TITLE,data:data})
export const delete_title=(data)=>({type:DELETE_TITLE,data:data})