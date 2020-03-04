import {combineReducers} from 'redux'
import LoginReducer from './login_reducer'
import TitleReducer from './title_reducer'

export default combineReducers({
    userInfo:LoginReducer,
    title:TitleReducer
})