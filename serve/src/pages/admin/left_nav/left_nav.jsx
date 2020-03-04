import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {save_title} from '../../../redux/actions/title_creators'
import MenuArrays from '../../../config/menu-config'
import { Menu, Icon } from 'antd';
import "./css/left_nav.less"

const { SubMenu,Item } = Menu;

class LeftNav extends Component {
    HanldeMenu=(MenuArrays)=>{
        return MenuArrays.map((item)=>{
            if(!item.children){
                return (
                    <Item key={item.key} onClick={()=>{this.props.save_title(item.title)}}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.HanldeMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        const {pathname}=this.props.history.location
        const openKeys=this.props.history.location.pathname.split('/').splice(2)
        
        return (
            <div className="left-nav">
                <h2 className="left-nav-title">商城后台管理</h2>
                <Menu
                    selectedKeys={[pathname.split('/').reverse()[0]]}
                    defaultOpenKeys={openKeys}
                    mode="inline"
                    theme="dark"
                >
                    {this.HanldeMenu(MenuArrays)}
                </Menu>
            </div>
        )
    }
}
export default connect(null,{save_title})(withRouter(LeftNav))