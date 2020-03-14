import React, { Component } from 'react'
import {Card,Button,Icon,List,message} from 'antd';
import {apiProductDetail,apiCategory} from '../../api/index'
import {MIURL} from '../../config/index'
import "./detailproduct.less"
const {Item}=List

export default class DetailProduct extends Component {
    state={
        productDel:{
            imgs:[]
        },
        categoryName:'',
        Catloading:true
    }
    getDetail=async (id)=>{
        let result=await apiProductDetail(id)
        console.log(result)
        if(result.status===0){
            this.setState({
                productDel:result.data
            })
            let result1=await apiCategory()
            if(!result1.status){
                result1.data.forEach((item)=>{
                    if(item.id===this.state.productDel.id){
                        console.log(item)
                        this.setState({
                            categoryName:item.name
                        })
                    }
                })
            }
            this.setState({
                Catloading:false
            })
        }else{
            message.warning(result.msg)
        }
    }
    componentDidMount(){
        this.getDetail(this.props.match.params.id)
        
    }
    render() {
        return (
            <Card 
                title={
                    <div>
                        <Button type="link" size="small" onClick={this.props.history.goBack}>
                            <Icon type="arrow-left" style={{fontSize:'20px'}} />
                        </Button>
                        <span>商品详情</span>
                    </div>
                }
            >
                <List loading={this.state.Catloading}>
                    <Item>
                        <span className="detail-title">商品名称：</span>
                        <span>{this.state.productDel.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-title">商品描述：</span>
                        <span>{this.state.productDel.desc_ribe}</span>
                    </Item>
                    <Item>
                        <span className="detail-title">商品价格：</span>
                        <span>{this.state.productDel.price}</span>
                    </Item>
                    <Item>
                        <span className="detail-title">所属分类：</span>
                        <span>{this.state.categoryName}</span>
                    </Item>
                    <Item>
                        <span className="detail-title">商品图片：</span>
                        <span>
                        {
                            // this.state.productDel.imgs.length
                            this.state.productDel.imgs.map((item,index)=>{
                                return <img key={index} src={MIURL+'/upload/'+item} style={{width:"240px",height:"240px"}} alt=" "/>
                            })
                        }
                        </span>
                    </Item>
                    <Item>
                        <span className="detail-title">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: this.state.productDel.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
