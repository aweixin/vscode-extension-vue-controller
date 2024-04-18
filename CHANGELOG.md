# vue-container 

## 0.0.15
- 优化 create vue controller 自动创建 pageRouter 并引入路由文件

## 0.0.14
- 优化 create vue router 询问是否包含所有路由文件 no(会忽略 `authentication` 文件夹下面的路由文件 )

## 0.0.11
- 删除 create vue controller 在views 目录下创建 component 文件 (自行创建)
- 优化 create vue router 必须在views目录进行操作，适配多级目录
- 优化 create vue controller 使用class 创建 controller config request
- 优化 create vue controller index.vue 中自动引入 controller config request

## 0.0.12
- interface 新增 interface.ts 声明 typescript 类型

## 0.0.10
- 新增create vue router 在views 目录下创建 pageRouter.ts 文件 里面包含了所有页面路由

## 0.0.8
- 修复创建controller时，router.ts 引入模版多层嵌套导致模版引入路径错误

## 0.0.7
- 新增copy vue router 引入路径

## 0.0.1
- Initial release