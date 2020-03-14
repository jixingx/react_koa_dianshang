import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message } from 'antd';
import {apiCategory, apiProductAdd,apiProductDetail,apiProductEdit} from '../../api/index'
import PicturesWalls from './pictureswalls'
import RichTextEditor from './rich_text_editor'

const { Option } = Select;

class AddEditProduct extends Component {
    state={
        categorys:[],
        currentProduct:{
            id:'',
            imgs: [],
            name: "",
            desc_ribe: "",
            price: 0,
            categoryId: '',
            detail: ''
        }
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
    getProductInfo=async (id)=>{
        let result=await apiProductDetail(id)
        if(result.status===0){
            this.refs.picturesWalls.setPictureNameArr(result.data.imgs)
            this.refs.richTextEditor.setRichText(result.data.detail)
            this.setState({
                currentProduct:result.data
            })
        }else{
            message.warning(result.msg)
        }
    }
    componentDidMount(){
        const {id}=this.props.match.params
        if(id){
            this.getProductInfo(id)
        }
        this.getCategory()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let imgArr=this.refs.picturesWalls.getPictureNameArr()
                imgArr=imgArr.join(',')
                values.imgs=imgArr
                values.detail=this.refs.richTextEditor.getRichText()
                // console.log(values)
                let result;
                if(!this.state.currentProduct.id){
                    result=await apiProductAdd(values)
                }else{
                    values.id=this.state.currentProduct.id
                    result=await apiProductEdit(values)
                }
                if(result.status===0){
                    message.success(result.msg)
                    this.props.history.replace('/admin/prod_about/product')
                }else{
                    message.warning(result.msg)
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {urlid}=this.props.match.params
        const {name,desc_ribe,price,categoryId}=this.state.currentProduct
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
                        <span>商品{urlid?'修改':'添加'}</span>
                    </div>
                }
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue:name||'',
                            rules: [{ required: true, message: '商品名称必填' }],
                        })(
                            <Input
                            placeholder="商品名称"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品描述">
                        {getFieldDecorator('desc_ribe', {
                            initialValue:desc_ribe||'',
                            rules: [{ required: true, message: '商品描述必填' }],
                        })(
                            <Input
                            placeholder="商品描述"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue:price||'',
                            rules: [{ required: true, message: '商品价格必填' }],
                        })(
                            <Input
                                placeholder="商品价格"
                                prefix="￥"
                                addonAfter="元"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue:categoryId||"",
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
                        <PicturesWalls ref="picturesWalls" />
                    </Form.Item>
                    <Form.Item label="商品详情" wrapperCol={{span:15}}>
                        <RichTextEditor ref="richTextEditor" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                </Form>
            </Card>
        )
    }
}
const WrappedNormalLoginForm = Form.create({})(AddEditProduct);
export default WrappedNormalLoginForm