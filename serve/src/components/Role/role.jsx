import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input, message } from 'antd';
import {apiRolesList,apiRolesAdd} from '../../api/index'
import dayjs from 'dayjs'

class Role extends Component {
    state = { 
        visible: false,
        roleList:[] 
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

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
    
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields()
    };
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
                //dataIndex: 'auth_name',
                key: 'operation',
                render:()=>{
                    return (
                        <Button type="link">设置权限</Button>
                    )
                }
            }
        ];
        const { getFieldDecorator } = this.props.form;
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
            </div>
        )
    }
}
const RoleForm = Form.create({})(Role);
export default RoleForm;