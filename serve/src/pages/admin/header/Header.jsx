import React, { Component } from 'react'
import './css/header.less'
import {Button,Icon,Modal} from 'antd'
import screenfull from 'screenfull';
import {connect} from 'react-redux';
import {loginout} from '../../../redux/actions/login_creators'
import dayjs from 'dayjs'

const { confirm } = Modal;

class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年MM月DD HH:mm:ss')
    }
    toggleFull=()=>{
        let {isFull}=this.state
        screenfull.toggle()
        this.setState({isFull:!isFull})
    }
    componentDidMount(){
        screenfull.on('change', () => {
            this.setState({
                isFull:screenfull.isFullscreen ? true : false
            })
            
        });
        this.time=setInterval(()=>{
            this.setState({
                date:dayjs().format('YYYY年MM月DD HH:mm:ss')
            })
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
    
    UserLoginOut=()=>{
        confirm({
            title: '您确定退出登录状态吗?',
            content: '退出后要重新登录',
            cancelText:"取消",
            okText:"确定",
            onOk:()=> {
                this.props.loginout()
            },
            onCancel() {
                
            },
        });
    }
    render() {
        const {username}=this.props.userInfo.user
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.toggleFull}>
                        <Icon type={this.state.isFull?"fullscreen-exit":"fullscreen"} />
                    </Button>
                    <span>您好,{username}</span>
                    <Button type="link" size="small" onClick={this.UserLoginOut}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.date}</span>
                        <span>多云转阴 温度：3~-4°</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state)=>({userInfo:state.userInfo}),
    {loginout}
)(Header)