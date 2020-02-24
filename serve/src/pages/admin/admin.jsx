import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Header from './header/Header'

import { Layout } from 'antd';
import "./css/admin.less"
const { Footer, Sider, Content } = Layout;
 



class Admin extends Component {
    render() {
        if(!this.props.userInfo.isLogin){
            //进入此判断意味着用户已经登录，强制跳转admin
            // this.props.history.replace('/admin')
            return <Redirect to="/login" />
        }
        return (
            <Layout className="content">
                <Sider>Sider</Sider>
                <Layout>
                    <Header />
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}
 

export default connect(
    state=>({userInfo:state.userInfo})
)(Admin);