import React, { Component } from 'react'
import { Card,Button,Icon,Select,Input,Table,message } from 'antd';
import {apiProductList} from '../../api/index'

const { Option } = Select;

export default class Product extends Component {
    state={
        productList:[],
        pages:'',
        total:''
    }
    getProductList=async (pageNum,pageSize)=>{
        let result=await apiProductList(pageNum,pageSize)
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
        this.getProductList(1,5)
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
                dataIndex: 'status',
                key: 'status',
                align:"center",
                width:"10%",
                render:(status)=>{
                    return (
                        <div>
                            <Button type={status===1?'danger':'primary'}>{status===1?'下架':'上架'}</Button><br />
                            <span>{status===1?'在售':'已停售'}</span>
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
                render:()=>{
                    return (
                        <div>
                            <Button type="link">详情</Button><br />
                            <Button type="link">修改</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <Card 
                title={
                    <div>
                        <Select defaultValue="name">
                            <Option value="name">按名称搜索</Option>
                            <Option value="desc">按描述搜索</Option>
                        </Select>
                        <Input placeholder="输入关键字" style={{width:'150px',margin:'0 10px'}} allowClear />
                        <Button type="primary">
                            <Icon type="search" />搜索
                        </Button>
                    </div>
                } 
                extra={
                    <Button type="primary">
                        <Icon type="plus-circle" />增加商品
                    </Button>
                }
            >
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered 
                    rowKey="id"
                />;
            </Card>
        )
    }
}
