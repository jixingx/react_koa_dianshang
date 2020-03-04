import React, { Component } from 'react'
import './css/header.less'
import { withRouter } from 'react-router-dom'
import MenuArrays from '../../../config/menu-config'
import {Button,Icon,Modal} from 'antd'
import screenfull from 'screenfull';
import {connect} from 'react-redux';
import {loginout} from '../../../redux/actions/login_creators'
import {save_title} from '../../../redux/actions/title_creators.js'
import dayjs from 'dayjs'
import {apiWeather} from "../../../api/index"

const { confirm } = Modal;

class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年MM月DD HH:mm:ss'),
        weather:{}
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
        //请求天气
        apiWeather().then((res)=>{
            this.setState({weather:res})
        }).catch((err)=>{
            console.log(err)
        })
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
    SetTiTle=()=>{
        let pathname=this.props.history.location.pathname.split('/').reverse()[0]
        let title='';
        MenuArrays.forEach((item)=>{
            if(item.children instanceof Array){
                let result=item.children.find((menuitem)=>{
                    return menuitem.key===pathname
                })
                if(result){
                    title=result.title
                }
                
            }else{
                if(item.key===pathname){
                    title=item.title
                }
            }
            
        })
        this.props.save_title(title)
        return title
    }
    render() {
        const {username}=this.props.userInfo.user
        const {city,wea,tem2,tem1}=this.state.weather
        
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
                        {this.props.title || this.SetTiTle()}
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.date}</span>
                        <span className="city">{city}</span>
                        <span>{wea} 温度：{tem2}~{tem1}°</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state)=>({userInfo:state.userInfo,title:state.title}),
    {loginout,save_title}
)(withRouter(Header))