import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select } from 'antd';
import {apiCategory} from '../../api/index'

const { Option } = Select;

class AddEditProduct extends Component {
    state={
        categorys:[]
    }
    getCategory=async ()=>{
        let result=await apiCategory()
        if(!result.state){
            this.setState({
                categorys:result.data
            })
        }else{
            this.setState({
                categorys:[]
            })
        }
    }
    componentDidMount(){
        this.getCategory()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
              md:{ span: 2 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
              md:{ span: 7 }
            },
          };
        return (
            <Card 
                title={
                    <div>
                        <Button type="link" size="small" onClick={this.props.history.goBack}>
                            <Icon type="arrow-left" style={{fontSize:'20px'}} />
                        </Button>
                        <span>商品添加</span>
                    </div>
                }
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="商品名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '商品名称必填' }],
                        })(
                            <Input
                            placeholder="商品名称"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品描述">
                        {getFieldDecorator('desc_ribe', {
                            rules: [{ required: true, message: '商品描述必填' }],
                        })(
                            <Input
                            placeholder="商品描述"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '商品价格必填' }],
                        })(
                            <Input
                            placeholder="商品价格"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue:"",
                            rules: [{ required: true, message: '商品分类必填' }],
                        })(
                            <Select style={{ width: 120 }}>
                                <Option value="">请选择分类</Option>
                                {
                                    this.state.categorys.map((item)=>{
                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="商品图片">
                        图片上传
                    </Form.Item>
                    <Form.Item label="商品详情">
                        富文本
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form>
            </Card>
        )
    }
}
const WrappedNormalLoginForm = Form.create({})(AddEditProduct);
export default WrappedNormalLoginForm