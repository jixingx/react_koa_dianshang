import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table,message } from 'antd';
import {apiProductList,apiProductSearch,apiProductUpdateStatus} from '../../api/index'
import {PAGE_SIZE} from '../../config/index'

const { Option } = Select;

export default class Product extends Component {
    state={
        productList:[],
        pages:'',
        total:'',
        typeSerach:'productName',
        keyWords:'',
        current:''
    }
    getProductList=async (pageNum,pageSize)=>{
        let result
        if(this.Serach){
            result=await apiProductSearch([this.state.typeSerach],this.state.keyWords,pageNum,pageSize)
        }else{
            result=await apiProductList(pageNum,pageSize)
        }
        const {status,data,msg}=result
        if(status===0){
            this.setState({
                productList:data.list,
                pages:data.pages,
                total:data.total
            })
        }else{
            message.warning(msg)
        }
    }
    componentDidMount(){
        this.getProductList(1,PAGE_SIZE)
    }
    //更新商品状态
    setStatus=async (id,status)=>{
        console.log(id,status)
        if(status===1){
            status=2
        }else{
            status=1;
        }
        let result=await apiProductUpdateStatus(id,status);
        if(result.status===0){
            message.success(result.msg)
            this.getProductList(1,PAGE_SIZE)
        }else{
            message.warning(result.msg)
        }
    }
    render() {
        const dataSource = this.state.productList
          
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc_ribe',
                key: 'desc_ribe',
                width:"45%",
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                align:"center",
                width:"10%",
                render:(price)=>{
                    return "￥"+price
                }
            },
            {
                title: '状态',
                //dataIndex: 'status',
                key: 'status',
                align:"center",
                width:"10%",
                render:(item)=>{
                    return (
                        <div>
                            <Button type={item.status===1?'danger':'primary'} onClick={()=>{this.setStatus(item.id,item.status)}}>{item.status===1?'下架':'上架'}</Button><br />
                            <span>{item.status===1?'在售':'已停售'}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                //dataIndex: 'price',
                key: 'operation',
                align:"center",
                width:"10%",
                render:(item)=>{
                    return (
                        <div>
                            <Button type="link" onClick={()=>{this.props.history.push('/admin/prod_about/product/detailproduct/'+item.id)}}>详情</Button><br />
                            <Button type="link" onClick={()=>{this.props.history.push('/admin/prod_about/product/addeditproduct')}}>修改</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <Card 
                title={
                    <div>
                        <Select defaultValue="productName" onChange={(value)=>{ this.setState({typeSerach:value}) }}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input placeholder="输入关键字" onChange={(event)=>{this.setState({keyWords:event.target.value})}} style={{width:'150px',margin:'0 10px'}} allowClear />
                        <Button type="primary" onClick={()=>{this.Serach=true;this.getProductList(1,PAGE_SIZE);this.setState({current:1})}}>
                            <Icon type="search" />搜索
                        </Button>
                    </div>
                } 
                extra={
                    <Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/addeditproduct')}}>
                        <Icon type="plus-circle" />增加商品
                    </Button>
                }
            >
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered 
                    rowKey="id"
                    pagination={
                        {
                            total:this.state.total,
                            pageSize:PAGE_SIZE,
                            current:this.state.current,
                            onChange:(page)=>{
                                this.getProductList(page,PAGE_SIZE)
                                this.setState({
                                    current:page
                                })
                            }
                        }
                    }
                />;
            </Card>
        )
    }
}
