import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect,Switch,Route} from 'react-router-dom'
import Header from './header/Header'
import LeftNav from './left_nav/left_nav'
import Home from "../../components/Home/home"
import Category from "../../components/Category/category"
import Product from "../../components/Product/product"
import AddEditProduct from "../../components/Product/addeditproduct"
import DetailProduct from "../../components/Product/detailproduct"
import User from "../../components/User/user"
import Role from "../../components/Role/role"
import Bar from "../../components/Bar/bar"
import Line from "../../components/Line/line"


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
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content className="pagebox">
                        <Switch>
                            <Route path="/admin/home" component={Home}/>
                            <Route path="/admin/prod_about/category" component={Category}/>
                            <Route exact path="/admin/prod_about/product"  component={Product}/>
                            <Route path="/admin/prod_about/product/addeditproduct" exact  component={AddEditProduct}/>
                            <Route path="/admin/prod_about/product/addeditproduct/:id"  component={AddEditProduct}/>
                            <Route path="/admin/prod_about/product/detailproduct/:id" component={DetailProduct}/>
                            <Route path="/admin/user" component={User}/>
                            <Route path="/admin/role" component={Role}/>
                            <Route path="/admin/charts/bar" component={Bar}/>
                            <Route path="/admin/charts/line" component={Line}/>
                            <Redirect to="/admin/home" />
                        </Switch>
                    </Content>
                    <Footer className="footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
                </Layout>
            </Layout>
        );
    }
}
 

export default connect(
    state=>({userInfo:state.userInfo})
)(Admin);