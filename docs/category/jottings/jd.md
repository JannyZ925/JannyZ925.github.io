# 仿京东项目C端(taro)

## tabBar模块

### 注意点

1. 图标要放在 src 目录下的 public 文件夹中，用 public/xxx.png 获取
2. 在命令行使用 taro create --name home 可以自动创建一个名为 home 的页面

### 具体代码

```js
// src/app.config.ts
tabBar: {
    selectedColor: '#6495ED',
    list:[
            {
                text: '首页',
                pagePath: 'pages/home/index',
                iconPath: 'public/tabbar/home.png',
                selectedIconPath: 'public/tabbar/home-active.png'
            },
            {
                text: '新品',
                pagePath: 'pages/new/index',
                iconPath: 'public/tabbar/new.png',
                selectedIconPath: 'public/tabbar/new-active.png'
            },
            {
                text: '购物车',
                pagePath: 'pages/cart/index',
                iconPath: 'public/tabbar/cart.png',
                selectedIconPath: 'public/tabbar/cart-active.png'
            },
            {
                text: '我的',
                pagePath: 'pages/my/index',
                iconPath: 'public/tabbar/my.png',
                selectedIconPath: 'public/tabbar/my-active.png'
            }
    ]
}
```

[语雀知识库链接](https://www.yuque.com/lexmin/rlww9b)
