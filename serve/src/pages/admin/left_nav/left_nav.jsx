import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuArrays from '../../../config/menu-config'
import { Menu, Icon } from 'antd';
import "./css/left_nav.less"

const { SubMenu,Item } = Menu;

export default class LeftNav extends Component {
    HanldeMenu=(MenuArrays)=>{
        return MenuArrays.map((item)=>{
            if(!item.children){
                return (
                    <Item key={item.key}>
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
        return (
            <div className="left-nav">
                <h2 className="left-nav-title">商城后台管理</h2>
                <Menu
                    defaultSelectedKeys={['home']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {this.HanldeMenu(MenuArrays)}
                    {/* <Item key="1">
                        <Link to="/admin/home">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Link>
                    </Item>
                    <Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>Navigation One</span>
                        </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}
