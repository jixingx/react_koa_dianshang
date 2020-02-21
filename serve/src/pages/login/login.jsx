import React, { Component } from 'react';
import {apiLogin} from '../../api';
import { Form, Icon, Input, Button, message } from 'antd';
import "./css/login.less"
import {save_userinfo} from '../../redux/actions/login_creators.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const {Item}=Form

class Login extends Component {
    //获取表单数据
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // Myaxios.post("http://localhost:8080/admin/login",values).then((res)=>{
                //     console.log(res)
                // },(error)=>{
                //     console.log(error)
                // })
                let result=await apiLogin(values)
                if(result.status===0){
                    message.success('登录成功')
                    this.props.history.replace('/admin')
                    this.props.save_userinfo(result)
                }else{
                    message.warning(result.msg)
                }
            }
        })
    }
    render() { 
        if(this.props.userInfo.isLogin){
            //进入此判断意味着用户已经登录，强制跳转admin
            // this.props.history.replace('/admin')
            return <Redirect to="/admin" />
        }
        const { getFieldDecorator } = this.props.form;
        return ( 
            <div className="login">
                <div className="header">
                    <h1>商品管理系统</h1>
                </div>
                <div className="content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名必须输入' },//限制该输入域必须输入
                                { min: 4, message: '用户名必须大于等于4位' },
                                { max: 12, message: '用户名必须小于等于4位' },
                                { pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ],
                        })(
                            
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '密码必须输入' },//限制该输入域必须输入
                                { min: 4, message: '密码必须大于等于4位' },
                                { max: 12, message: '密码必须小于等于4位' },
                                { pattern: /^\w+$/, message: '密码必须是英文、数字或下划线组成' },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        )}    
                    </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        );
    }
}
//加工了我们编写的Login组件，生成一个新的WrappedLogin组件
const WrappedLogin = Form.create()(Login);

export default connect(
    (state)=>({userInfo:state.userInfo}),
    {save_userinfo}
)(WrappedLogin);