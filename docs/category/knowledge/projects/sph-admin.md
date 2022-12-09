# 后台管理项目笔记

## 登录模块

1. 进入 store 文件夹中的 user.js 文件，修改 login 方法
2. 进入 utils 文件夹中的 requests.js 文件，将请求拦截器中的 config.headers['X-Token'] 改为 config.headers['token']
3. 进入 vue.config.js 配置文件，在 devServer 配置项中加入如下代码：
```js
// 配置代理服务器，解决跨域问题
    proxy: {
      '/dev-api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        pathRewrite: { '^/dev-api': ''}
      }
    }
```
4. 进入 api 文件夹中的 user.js 文件，将所有的 url 改为真实接口路径

## 商品管理模块

### 路由搭建

1. 在 views 文件夹中新建 product 文件夹，再分别建立 TradeMark、Attr、Spu、Sku 文件夹及同名组件
2. 在 router 文件夹下的 index.js 中添加如下代码：
```js
{
    path: '/product',
    component: Layout,
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'traderMark',
        name: 'TraderMark',
        component: () => import('@/views/product/TradeMark'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理' }
      }
    ]
  }
```

### 品牌管理

#### 品牌列表展示

1. 静态组件搭建
2. 书写接口
- 在 api 文件夹下新建 product 文件夹，以及四个 js 文件
- 在 api 文件夹下新建 index.js 文件，将 product 中的四个模块对外暴露
- 将 api 请求接口挂载到 Vue 原型上，这样所有的组件都可以使用该接口
- 在 TradeMark 组件中定义以下数据：
  ```js
   // 当前页码
   page: 1,
   // 每页显示数据条数
   limit: 5,
   // 数据总数
   total: 0,
   // 品牌列表数组
   tradeMarkList: []
   ```
- 调用接口，获取品牌列表和数据总数，将数据展示在表格中，修改分页器中相关数据
  ```js
   // 获取品牌列表
   async getTradeMarkListByPage() {
       // 解构出页码和每页显示的数据条数
       const { page, limit } = this;
       // 调用获取品牌数据的接口
       const result = await this.$api.tradeMark.getTradeMarkList(page, limit);
       if (result.code === 200) {
           this.tradeMarkList = result.data.records;
           this.total = result.data.total;
       }
   }
   ```
- 完善分页器相关事件

#### 添加品牌

1. 静态组件搭建
2. 书写接口
