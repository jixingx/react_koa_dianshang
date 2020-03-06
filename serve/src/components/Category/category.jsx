import React, { Component } from 'react'
import { Card,Button,Icon,Table,Modal,Form,Input,message } from 'antd';
import {apiCategory,apiCategoryAdd,apiCategoryUpdate} from '../../api/index'

class Category extends Component {
    state = { 
      visible: false,
      dataSource:[]
    };
    //点击模态框确认按钮
    handleOk = e => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
            // console.log('Received values of form: ', values);
            
            let result=''
            if(this.add){
              console.log(values)
              result=await apiCategoryAdd(values)
            }else{
              values.id=this.id
              result=await apiCategoryUpdate(values)
            }
            if(result.status===0){
                this.setState({
                  visible: false,
                });
                this.props.form.resetFields()
                this.getlist()
                message.success(this.add?'新增成功':'更新成功',1)
                
            }else{
                message.warning(result.msg,1)
            }
        }
      })
    };
    //点击模态框取消按钮
    handleCancel = e => {
      this.props.form.resetFields()
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
          dataSource:result.data.reverse()
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
            // dataIndex: 'operation',
            key: 'operation',
            align:"center",
            width:"25%",
            render:(item)=>{
                
                return (<Button type="link" 
                  onClick={
                    ()=>{
                      this.id=item.id
                      this.name=item.name
                      this.add=false
                      this.setState({
                        visible: true
                      })
                    }
                  }
                  >
                    修改分类
                  </Button>)
            }
          },
        ];
        return (
          <div>
             <Card extra={
              <Button 
                type="primary" 
                onClick={
                  ()=>{
                    this.id=''
                    this.name=''
                    this.add=true
                    this.setState({
                      visible: true
                    })
                  }
                }
              >
                <Icon type="plus-circle" />增加
              </Button>
            }>
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                    rowKey="id"
                    pagination={{pageSize:5}}
                />
            </Card>
            <Modal
              title={this.add?'分类新增':'分类修改'}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="取消"
              okText="确定"
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('categoryName', {
                    initialValue:this.name,
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