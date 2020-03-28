# 数据库
使用`mysql`数据库

数据库名:`xretailers`

1. user表

字段 | 类型 | 描述
-|-|-|
id | int | 主键
username | varchar(30) | 用户名
password | varchar(50) | 密码
create_time | datetime | 创建时间
phone | char(11) | 手机
email | varchar(50) | 邮箱
role_id | int | 权限id

2. products表

字段 | 类型 | 描述
-|-|-|
id | int | 商品主键id
status | int(11) | 商品状态
imgs | varchar(255) | 商品图片
name | varchar(60) | 商品名字
desc_ribe | varchar(255) | 商品描述
price | decimal(12,2) | 商品价格
categoryId | int(11) | 分类id
detail | text | 商品详细

3. categorys表

字段 | 类型 | 描述
-|-|-|
id | int | 分类主键id
name | varchar(30) | 分类名称

4. roles表

字段 | 类型 | 描述
-|-|-|
id | int | 角色权限主键
menus | varchar(255) | 菜单权限
name | varchar(30) | 角色权限名称
create_time | datetime | 创建时间
auth_time | datetime | 授权时间
auth_name | varchar(50) | 授权用户
