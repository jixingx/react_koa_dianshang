import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import "./css/left_nav.less"

const { SubMenu,Item } = Menu;

export default class LeftNav extends Component {
    
    render() {
        return (
            <div className="left-nav">
                <h2 className="left-nav-title">商城后台管理</h2>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
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
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
