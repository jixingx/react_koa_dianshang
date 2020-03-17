import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input, message,Tree } from 'antd';
import {apiRolesList,apiRolesAdd,apiRolesUpdate} from '../../api/index'
import dayjs from 'dayjs'
import menuList from '../../config/menu-config'
import {connect} from 'react-redux'

const { TreeNode } = Tree;


  

class Role extends Component {
    state = { 
        visible: false,
        visibleAuth: false,
        roleList:[],
        checkedKeys: []
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    // 获取角色列表
    getRoleList=async ()=>{
        let result=await apiRolesList()
        if(result.status===0){
            this.setState({
                roleList:result.data.reverse()
            })
        }else{
            message.warning(result.msg)
        }
    }

    componentDidMount(){
        this.getRoleList()
    }
    // 添加角色确认函数
    handleOk = (e) => {
        // console.log(e);
        // this.setState({
        //     visible: false,
        // });
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let result=await apiRolesAdd(values)
                if(result.status===0){
                    message.success(result.msg)
                    this.getRoleList()
                }else{
                    message.success(result.msg)
                }
                this.setState({
                    visible: false,
                });
                this.props.form.resetFields()
            }
        });
    };
    // 添加角色取消函数
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields()
    };
    //授权确认函数
    handleAuthOk =async (e) => {
        // console.log(this.id)
        // console.log(this.props.userInfo.user.username,this.state.checkedKeys.toString())
        
        let result=await apiRolesUpdate(this.id,this.state.checkedKeys.toString(),this.props.userInfo.user.username)
        if(result.status===0){
            message.success(result.msg)
            this.getRoleList()
            this.setState({
                visibleAuth: false,
            });
        }else{
            message.warning(result.msg)
        }
        
    }
    //授权取消函数
    handleAuthCancel = () => {
        this.setState({
            visibleAuth: false,
        });
    };

   
    
    onCheck = checkedKeys => {
        //console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };
    
    
    renderTreeNodes = data =>
    data.map(item => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} {...item} />;
    });
    render() {
        const dataSource = this.state.roleList;
        
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(create_time)=>{
                    return create_time?dayjs(create_time).format('YYYY年MM月DD日 HH:mm'):'';
                }
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render:(auth_time)=>{
                    return auth_time?dayjs(auth_time).format('YYYY年MM月DD日 HH:mm'):'';
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
                witdh:"15%"
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'operation',
                render:(id)=>{
                    return (
                        <Button type="link" 
                            onClick={
                                ()=>{
                                    this.id=id
                                    let itemRlo=this.state.roleList.find((item)=>{
                                        return item.id===id
                                    })
                                    if(itemRlo){
                                        this.setState({
                                            checkedKeys:itemRlo.menus?itemRlo.menus.split(','):[]
                                        })
                                    }
                                    this.setState({visibleAuth:true})
                                }
                            }
                        >
                            设置权限
                        </Button>
                    )
                }
            }
        ];
        const { getFieldDecorator } = this.props.form;

        const treeData = menuList;
        return (
            <div>
                <Card 
                    title={<Button type="primary" onClick={this.showModal}><Icon type="plus" />新增角色</Button>}
                >
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered
                        rowKey="id"
                    />
                </Card>
                {/* 角色新增弹窗 */}
                <Modal
                    title="新增角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                    <Form className="login-form">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '角色名必须输入' }],
                        })(
                            <Input
                                placeholder="请输入角色名"
                            />,
                        )}
                    </Form>
                </Modal>
                {/* 树形弹窗 */}
                <Modal
                    title="授权"
                    visible={this.state.visibleAuth}
                    onOk={this.handleAuthOk}
                    onCancel={this.handleAuthCancel}
                    cancelText="取消"
                    okText="确认"
                >
                    <Tree
                        checkable//控制树的节点是否可以选择
                        //onExpand={this.onExpand}//展开菜单的回调
                        //expandedKeys={this.state.expandedKeys}//要展开哪个菜单
                        //autoExpandParent={this.state.autoExpandParent}//自动打开父节点
                        onCheck={this.onCheck}//选择某个菜单之后的回调
                        checkedKeys={this.state.checkedKeys}//默认选择哪个
                        //onSelect={this.onSelect}//
                        //selectedKeys={this.state.selectedKeys}
                        defaultExpandAll//默认打开所有的节点
                    >
                        <TreeNode title="平台功能" key="top">
                            {this.renderTreeNodes(treeData)}
                        </TreeNode>
                    </Tree>
                </Modal>
            </div>
        )
    }
}
const RoleForm = Form.create({})(Role);
export default connect(
    (state)=>({userInfo:state.userInfo}),
    null
)(RoleForm);