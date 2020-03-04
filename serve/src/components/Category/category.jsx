import React, { Component } from 'react'
import { Card,Button,Icon,Table } from 'antd';
const dataSource = [
    {
      key: '1',
      name: '智能手表'
    },
    {
      key: '2',
      name: '洗护用品'
    },
  ];
  
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
export default class Category extends Component {
    render() {
        return (
            <Card extra={<Button type="primary"><Icon type="plus-circle" />增加</Button>}>
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                />;
            </Card>
        )
    }
}
