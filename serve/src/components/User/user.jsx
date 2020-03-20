import React, { Component } from 'react'
import { Card,Button,Icon,Table, message,Modal,Form,Input,Select } from 'antd';
import {apiUsersList,apiUsersAdd} from '../../api/index'
import dayjs from 'dayjs'

const { Option } = Select;

class User extends Component {
    state={
        usersList:[],
        roles:[],
        visible: false
    }
    getUersList=async ()=>{
        let result=await apiUsersList();
        if(result.status===0){
            this.setState({usersList:result.data.users.reverse(),roles:result.data.roles})
        }else{
            message.warning(result.msg)
        }
    }

    componentDidMount(){
        this.getUersList()
    }
    handleOk = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
               let result=await apiUsersAdd(values)
               if(result.status===0){
                    message.success(result.msg)
                    this.props.form.resetFields()
                    this.getUersList()
                    this.setState({
                      visible: false,
                    });
               }else{
                    message.warning(result.msg)
               }
            }
        })
        
    };
    
    handleCancel = e => {
        this.props.form.resetFields()
        this.setState({
          visible: false,
        });
    };
    render() {
        const dataSource = this.state.usersList;
          
        const columns = [
            {
              title: '用户名',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: '电话',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(create_time)=>{
                    return create_time?dayjs(create_time).format('YYYY年MM月DD日 HH:mm'):'';
                }
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render:(role_id)=>{
                    let result=this.state.roles.find((item)=>{
                        return item.id=role_id
                    })
                    if(result){
                        return result.name
                    }else{
                        return ''
                    }
                }
            },
            {
                title: '操作',
                //dataIndex: 'role_id',
                key: 'operation',
                render:()=>{
                    return (
                        <>
                            <Button type="link">修改</Button>
                            <Button type="link">删除</Button>
                        </>
                        
                    )
                }
            }
        ];
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card 
                    title={
                        <Button type="primary" onClick={()=>{ this.setState({visible:true}) }}><Icon type="plus" /> 创建用户</Button>
                    } 
                >
                    <Table 
                        columns={columns} 
                        dataSource={dataSource}
                        bordered
                        rowKey="id"
                    />
                </Card>
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                    <Form  labelCol={{md:{span:5}}} wrapperCol={{md:{span:15}}}>
                        <Form.Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '用户名必须输入' },//限制该输入域必须输入
                                    { min: 4, message: '用户名必须大于等于4位' },
                                    { max: 12, message: '用户名必须小于等于4位' },
                                    { pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成' },
                                ],
                            })(
                                <Input
                                    placeholder="请输入用户名"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '密码必须输入' },//限制该输入域必须输入
                                    { min: 4, message: '密码必须大于等于4位' },
                                    { max: 12, message: '密码必须小于等于4位' },
                                    { pattern: /^\w+$/, message: '密码必须是英文、数字或下划线组成' },
                                ],
                            })(
                                <Input
                                    placeholder="请输入密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="手机号码">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: '手机号码必须输入' },//限制该输入域必须输入
                                    { len: 11, message: '手机号码为11位' },
                                    { pattern: /^[1-9]\d*$/, message: '手机号码必须是数字' },
                                ],
                            })(
                                <Input
                                    placeholder="请输入手机号码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '邮箱必须输入' },//限制该输入域必须输入
                                ],
                            })(
                                <Input
                                    placeholder="请输入邮箱"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="角色">
                            {getFieldDecorator('role_id', {
                                initialValue:'',
                                rules: [
                                    { required: true, message: '角色必须选择' },//限制该输入域必须输入
                                ],
                            })(
                                <Select>
                                    <Option value="">请选择角色</Option>
                                    {
                                        this.state.roles.map((item,index)=>{
                                            return <Option value={item.id} key={index}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            
        )
    }
}

const UserForm = Form.create()(User);
export default UserForm;