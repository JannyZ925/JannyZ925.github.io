# 仿京东项目C端(taro)

## tabbar模块的开发

### 注意点

1. 图标要放在 src 目录下的 public 文件夹中，用 public/xxx.png 获取
2. 在命令行使用 taro create --name home 可以自动创建一个名为 home 的页面

### 具体代码

```js
//  src/app.config.ts
tabBar: {
    selectedColor: '#6495ED',
        list
:
    [
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

## 首页的开发

### 准备工作

1. 添加请求拦截器，代码如下：

```js
//  src/request/index.ts
import Taro from '@tarojs/taro'
// 请求拦截器
const requestInterceptor = (chain) => {
    const requestParams = chain.requestParams;
    // console.log(chain);
    // 获取请求的url
    const {url} = requestParams
    // 配置基础路径
    const baseUrl = 'http://localhost:5200/api/jd-service'
    // 添加基础路径
    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
        requestParams.url = `${baseUrl}${url}`
    }
    return chain.proceed(requestParams)
}

// 添加请求拦截器
Taro.addInterceptor(requestInterceptor)
```

2. 封装请求方法，代码如下：

```js
//  src/utils/request.ts
export const request = (url, method) => {
    const defaultMethod = "GET"
    return new Promise((resolve, reject) =>
        Taro.request({
            url,
            method: method || defaultMethod,
            success: (res) => {
                resolve(res.data.data);
            },
        })
    );
}
```

3. 封装控制是否显示加载提示框的方法，代码如下：

```js
//  src/utils/request.ts
// 控制是否显示加载中的提示
export const loading = (show, title = "玩命加载中...") => {
    if (show) {
        Taro.showLoading({
            title,
            mask: true,
        });
    } else Taro.hideLoading()
}
```

### 步骤

1. 在data中定义将要获取的数据

```js
// src/ pages/home/index.vue
data()
{
    return {
        // 轮播图
        bannerList: [],
        // 分类导航
        menuList: [],
        // 瀑布流
        floorList: [],
    };
}
```

2. 在methods中定义获取数据的方法

```js
//  src/pages/home/index.vue
methods: {
    // 获取轮播图数据
    getBannerList()
    {
        // 发起请求，获取轮播图数据
        return request("/home/bannerList")
    }
,
    // 获取分类导航数据
    getMenuList()
    {
        // 发起请求，获取分类导航数据
        return request("/home/menuList")
    }
,
    // 获取瀑布流数据
    getFloorList()
    {
        // 发起请求，获取瀑布流数据
        return request("/home/floorList")
    }
,
}
```

3. 在mounted中发起请求，请求完毕后关闭加载提示框

```js
//  src/pages/home/index.vue
mounted()
{
    // 提示加载中
    loading(true);
    // 发请求，给对应数据赋值
    Promise.all([
        this.getBannerList(),
        this.getMenuList(),
        this.getFloorList(),
    ]).then(([bannerList, menuList, floorList]) => {
        this.bannerList = bannerList;
        this.menuList = menuList;
        this.floorList = floorList;
        // 关闭加载中提示
        loading(false);
    });
}
```

4. 将数据渲染到页面

## 其他

[语雀知识库链接](https://www.yuque.com/lexmin/rlww9b)
