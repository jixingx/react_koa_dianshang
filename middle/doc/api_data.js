define({ "api": [
  {
    "type": "post",
    "url": "/category/add",
    "title": "分类商品新增接口",
    "name": "Addcategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>商品分类名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>新增的商品分类数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>status为1时,返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 1,\n  \"msg\":'已有此分类'\n}\nor\n{\n  \"status\":0,\n  \"data\":{\n     id:4,\n     name:男士背包\n  }\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'新增分类失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/category/list",
    "title": "分类列表接口",
    "name": "Getcategory",
    "group": "Category",
    "parameter": {
      "examples": [
        {
          "title": "Request:",
          "content": "无请求参数",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>商品分类全部数据(status为1时，data为:[])</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": qureyDate\n}\nor\n{\n  \"status\": 1,\n  \"data\":[]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/category/update",
    "title": "分类商品修改接口",
    "name": "Updatecategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "categoryName",
            "description": "<p>商品分类名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>修改的分类商品数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>status为1时,返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 1,\n  \"msg\":'已有此分类'\n}\nor\n{\n  \"status\":0,\n  \"data\":{\n     id:4,\n     name:女士背包\n  }\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'更新分类失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/deletefile",
    "title": "删除文件接口",
    "name": "FileDeletefile",
    "group": "File",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文件名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"name\":文件名称\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>删除信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"mag\": '删除成功'\n}\nor\n{\n  \"status\": 1,\n  \"msg\":'暂无此文件删除失败'\n}\nor\n{\n  \"status\": 1,\n  \"msg\":'商品删除失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    code:500,\n    msg:error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "文件上传接口",
    "name": "FileUpload",
    "group": "File",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>二进制流</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"file\":二进制文件流\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>文件名称和地址</p>"
          },
          {
            "group": "Success 200",
            "type": "msg",
            "optional": false,
            "field": "msg",
            "description": "<p>上传返回文字通知</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": {\n        \"name\":filename,\n        \"url\":\"http://localhost:8080/upload/\"+filename\n  }\n}\nor\n{\n  \"status\": 1,\n  \"msg\":'上传失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    code:500,\n    msg:error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "File"
  },
  {
    "type": "post",
    "url": "/product/add",
    "title": "添加商品详细接口",
    "name": "AddProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "imgs",
            "description": "<p>图片路径</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "desc_ribe",
            "description": "<p>商品简介</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>商品价格</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>商品分类ID</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>商品详细</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"imgs\":\"\",\n    \"desc_ribe\":\"\",\n    \"price\":0,\n    \"categoryId\":1,\n    \"detail\":\"\",\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"新增成功\"\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'新增失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/product/detail",
    "title": "获取商品详细接口",
    "name": "DetailProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>商品ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"productId\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>商品详细数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": {商品详细对象数据}\n}\nor\n{\n  \"status\": 1,\n  \"msg\":'商品详细获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/product/edit",
    "title": "修改商品详细接口",
    "name": "EditProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品详细ID</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "imgs",
            "description": "<p>图片路径</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "desc_ribe",
            "description": "<p>商品简介</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>商品价格</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>商品分类ID</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>商品详细</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"imgs\":\"\",\n    \"id\":1,\n    \"desc_ribe\":\"\",\n    \"price\":0,\n    \"categoryId\":1,\n    \"detail\":\"\",\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"商品修改成功\"\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'商品修改失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/product/list",
    "title": "商品列表接口",
    "name": "Getproduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>页码</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页条数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"pageNum\":1,\n    \"pageSize\":10\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>商品全部数据(status为1时，data为:[])</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": {\n        \"list\":[{id:1,name:\"苹果\"}...],//商品列表数据\n        \"pageNum\":1,//页码\n        \"pageSize\":10,//每页条数\n        \"pages\":20,//页数\n        \"total\":50.//总条数\n   }\n}\nor\n{\n  \"status\": 1,\n  \"data\": {\n        \"list\":[],//空列表\n        \"pageNum\":0,//页码\n        \"pageSize\":0,//每页条数\n        \"pages\":0,//页数\n        \"total\":0.//总条数\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/product/search",
    "title": "商品列表查询接口",
    "name": "Searchproduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>页码</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>商品名称</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "productDesc",
            "description": "<p>商品详细</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"pageNum\":1,\n    \"pageSize\":10,\n    \"productName\":\"\",\n    \"productDesc\":\"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>商品全部数据(status为1时，data为:[])</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": {\n        \"list\":[{id:1,name:\"苹果\"}...],//商品列表数据\n        \"pageNum\":1,//页码\n        \"pageSize\":10,//每页条数\n        \"pages\":20,//页数\n        \"total\":50.//总条数\n   }\n}\nor\n{\n  \"status\": 1,\n  \"data\": {\n        \"list\":[],//空列表\n        \"pageNum\":0,//页码\n        \"pageSize\":0,//每页条数\n        \"pages\":0,//页数\n        \"total\":0.//总条数\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/product/updateStatus",
    "title": "更改商品状态接口",
    "name": "UpdateStatusProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>商品状态（1为上架，2为下架）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"productId\":1,\n    \"status\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"商品状态更新成功\"\n}\nor\n{\n   \"status\": 0,\n   \"msg\":'商品状态更新失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/roles/add",
    "title": "添加角色接口",
    "name": "AddRoles",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"name\":\"\",\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"新增成功\"\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'新增失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/roles/update",
    "title": "角色授权接口",
    "name": "EditRoles",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "menus",
            "description": "<p>角色授权的菜单</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "auth_name",
            "description": "<p>授权的用户名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"id\":1,\n    \"menus\":\"/home,/user\",\n    \"price\":\"zhangsan\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"授权成功\"\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'授权失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "/roles/list",
    "title": "角色列表接口",
    "name": "ListRoles",
    "group": "Roles",
    "parameter": {
      "examples": [
        {
          "title": "Request:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>角色全部数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": []\n}\nor\n{\n  \"status\": 1,\n  \"msg\": '获取列表失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/roles/serach",
    "title": "查询角色接口",
    "name": "SerachRoles",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"role_id\":1\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>角色菜单数组</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"data\":['/home','/user']\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'菜单规划失败'\n}  \nor\n{\n   \"status\": 0,\n   \"msg\":[]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/users/add",
    "title": "添加用户接口",
    "name": "AddUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号码</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Request",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n    \"username\":\"\",\n    \"password\":\"\",\n    \"phone\":\"\",\n    \"email\":\"\",\n    \"role_id\":1,\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":0,\n  \"msg\":\"新增成功\"\n}\nor\n{\n   \"status\": 1,\n   \"msg\":'新增失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/list",
    "title": "获取用户列表接口",
    "name": "ListUsers",
    "group": "User",
    "parameter": {
      "examples": [
        {
          "title": "Request:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>用户全部数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>返回信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": {\n         roles:[角色信息],\n         users:[用户信息]\n  }\n}\nor\n{\n  \"status\": 1,\n  \"msg\": '获取列表失败'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "登录接口",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "String",
            "size": "5..30",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Request",
            "type": "String",
            "size": "6..30",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0为成功，1为失败</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>用户详细数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户认证码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>status为1时,返回的消息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": 0,\n  \"data\": qureyDate[0],\n  \"token\":\"Bearer \"+token\n}\nor\n{\n  \"status\": 1,\n  \"msg\":'用户名或密码错误'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500状态码</p>"
          },
          {
            "group": "Error 500",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\":500,\n    \"msg\":error\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "User"
  }
] });
