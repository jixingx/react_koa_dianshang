import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Admin extends Component {
    render() {
        if(!this.props.userInfo.isLogin){
            //进入此判断意味着用户已经登录，强制跳转admin
            // this.props.history.replace('/admin')
            return <Redirect to="/login" />
        }
        console.log(this.props.userInfo)
        return (
            
            <div>
                Admin{this.props.userInfo.user.username}
            </div>
        );
    }
}
 

export default connect(
    state=>({userInfo:state.userInfo})
)(Admin);