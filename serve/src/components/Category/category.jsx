import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input } from 'antd';
import {apiCategory} from '../../api/index'

class Category extends Component {
    state = { 
      visible: false,
      dataSource:[]
    };
    //点解增加按钮
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    //点击模态框确认按钮
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    //点击模态框取消按钮
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    //表格验证提交
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
    //请求分类列表
    getlist=async ()=>{
      let result=await apiCategory()
      if(!result.state){
        this.setState({
          dataSource:result.data
        })
      }else{
        this.setState({
          dataSource:[]
        })
      }
    }
    componentDidMount(){
      this.getlist()
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const dataSource = this.state.dataSource
          
        const columns = [
          {
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:"center",
            width:"25%",
            render:()=>{
                return <Button type="link">修改分类</Button>
            }
          },
        ];
        return (
          <div>
             <Card extra={<Button type="primary" onClick={this.showModal}><Icon type="plus-circle" />增加</Button>}>
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                    rowKey="id"
                    pagination={{pageSize:5}}
                />
            </Card>
            <Modal
              title="分类名称新增"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="取消"
              okText="确定"
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '分类名称不能为空' }],
                  })(
                    <Input
                      placeholder="请输入分类名称"
                    />,
                  )}
                </Form.Item>
              </Form>
            </Modal>
          </div>
        )
    }
}
const CategoryForm = Form.create()(Category);
export default CategoryForm