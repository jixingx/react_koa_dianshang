import React, { Component } from 'react'
import './css/header.less'
import {Button,Icon} from 'antd'
import screenfull from 'screenfull';

export default class Header extends Component {
    state={
        isFull:false
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
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.toggleFull}>
                        <Icon type={this.state.isFull?"fullscreen-exit":"fullscreen"} />
                    </Button>
                    <span>您好,admin</span>
                    <Button type="link" size="small">退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>2020年2月24日 11:10::20</span>
                        <span>多云转阴 温度：3~-4°</span>
                    </div>
                </div>
            </div>
        )
    }
}
