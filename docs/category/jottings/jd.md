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
    list: [
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
    const { url } = requestParams
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
    if(show) {
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

data() {
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
    getBannerList() {
        //   发起请求，获取轮播图数据
        return request("/home/bannerList")
    },
    // 获取分类导航数据
    getMenuList() {
        //   发起请求，获取分类导航数据
        return request("/home/menuList")
    },
    // 获取瀑布流数据
    getFloorList() {
        //   发起请求，获取瀑布流数据
        return request("/home/floorList")
    },
}
```

3. 在mounted中发起请求，请求完毕后关闭加载提示框
```js
//  src/pages/home/index.vue

mounted() {
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

## 分类页的开发

### 注意点

1. 由于分类页面时按需加载，所以需要进行分包
```js
//  src/app.config.ts
// 在pages目录下新建subpkg目录，专门存放需要进行分包的页面

subpackages: [
    {
      root: "pages/subpkg",
      pages: [
        "category/index"
      ]
    }
  ]
```

2. Taro绑定点击事件使用 @tap 而不是 @click

### 步骤

1. 给分类导航绑定点击事件
```html
<!--  src/pages/home/index.vue -->

<view 
    class="menu-item"
    v-for="(item, index) in menuList"
    :key="item.id"
    @tap="clickMenuItemHandler(item)">
    <image :src="item.imageUrl"/>
</view>
```

2. 点击事件具体代码如下：
```js
//  src/pages/home/index.vue 

// 点击分类导航项的事件
clickMenuItemHandler(item) {
  // 如果点击的是“分类”导航，则跳转到分类页面
  if(item.title === "分类") {
    Taro.navigateTo({url: '/pages/subpkg/category/index'})
  }
}
```

3. 调用接口获取数据
```js
//  src/pages/subpkg/category/index.vue

mounted() {
    // 显示加载提示框
    loading(true);
    // 发请求，给相应数据赋值
    Promise.all([this.getCategoryList()]).then(([categoryList]) => {
      this.categoryList = categoryList;
      // 默认二级分类为第一个一级分类下的children
      this.categoryLevel2 = categoryList[0].children
      // 请求完毕后关闭加载提示
      loading(false);
    });
}
```

4. 将数据渲染到页面
```html
<!--  src/pages/subpkg/category/index.vue  -->

<view class="scroll-view-container">
    <!-- 左侧滚动视图区域 -->
    <scroll-view class="left-scroll-view" scroll-y="true">
      <!-- 一级分类 -->
        <view 
            :class="['category-level1', active === index1 ? 'active' : '']" 
            v-for="(c1, index1) in categoryList" 
            :key="c1.catId" 
            @tap="changeCategory(index1)">
            {{c1.catName}}
        </view>
    </scroll-view>

    <!-- 右侧滚动视图区域 -->
    <scroll-view class="right-scroll-view" scroll-y="true">
      <!-- 二级分类，如果该二级分类有children属性才显示 -->
        <view 
            class="category-level2" 
            v-for="(c2, index2) in categoryLevel2" 
            :key="c2.catId" 
            v-show="'children' in c2">
            <view class="category-level2-name">/ {{ c2.catName}} /</view>
            <!-- 三级分类 -->
            <view class="category-level3-list">
                <view 
                    class="category-level3" 
                    v-for="(c3, index3) in c2.children" 
                    :key="c3.catId">
                    <image class="category-level3-img" :src="c3.catImage" />
                    <text class="category-level3-name">{{ c3.catName }}</text>
                </view>
            </view>
        </view>
    </scroll-view>
</view>
```

## 商品模块的开发

### 商品列表页
1. 准备参数
```js
//  src/pages/subpkg/goodsList/index.vue

// 参数对象
queryObj: {
    // 分类id
    cid: "",
    // 关键字
    keyword: "",
    // 是否为新品
    isNew: false,
    // 当前页码
    pageNum: 1,
    // 每页显示的数据条数
    pageSize: 15,
}
```

2. 发请求
```js
//  src/pages/subpkg/goodsList/index.vue

// 获取商品列表
async getGoodsList() {
    loading(true);
    // 发请求，获取新数据
    const result = await request("/goods", "GET", this.queryObj);
    // 如果没有新的数据，则显示提示文字
    if (this.goodsList.length !== 0 && result.length === 0) this.showTips = true;
    // 整合新旧数据
    this.goodsList = [...this.goodsList, ...result];
    // 停止下拉刷新
    Taro.stopPullDownRefresh();
    // 关闭加载提示
    loading(false);
}

async onLoad(options) {
    // 获取页面的参数
    this.queryObj.cid = options.cid || "";
    this.queryObj.keyword = options.keyword || "";
    this.queryObj.isNew = options.isNew || false;
    // 发起请求
    await this.getGoodsList();
}
```

3. 添加触底事件
```js
//  src/pages/subpkg/goodsList/index.vue

// 触底事件
onReachBottom() {
    // 页数加1，再次发起请求
    this.queryObj.pageNum += 1;
    this.getGoodsList();
}
```

4. 添加下拉刷新事件
```js
//  src/pages/subpkg/goodsList/index.vue

// 下拉刷新事件
onPullDownRefresh() {
    this.queryObj.pageNum = 1;
    // 清空商品列表
    this.goodsList = [];
    // 发起请求
    this.getGoodsList();
}
```

5. 将数据渲染到页面

### 其他步骤
1. 在首页点击瀑布流图片。跳转到商品列表（goodsList）页面
2. 在分类页点击三级分类，跳转到商品列表（goodsList）页面
3. 封装goodsItem组件，因为在goodsList页面、新品页面、购物车页面都要用到，可实现复用
4. 将获取商品列表的代码封装为mixin，但onLoad()生命周期还是写在goodsList页面中，因为goodsList和new页面此时需要获取的参数不同，所以需要分开写

### 新品页面

1. 引入mixin
```js
//  src/pages/new/index.vue

import mixin from "../../mixin/index";
mixins: [mixin]
```

2. 完成onLoad()生命周期函数
```js
//  src/pages/new/index.vue

async onLoad(options) {
    // 设置参数
    this.queryObj.isNew = true;
    // 发起请求
    await this.getGoodsList();
}
```

3. 将数据渲染到页面
```html
<!--  src/pages/new/index.vue -->

<view>
    <view style="min-height: 100vh">
        <goods-item v-for="(goods, index) in goodsList" :key="goods.goodsId" :goods="goods"/>
    </view>
    <view class="tips" v-if="showTips">我是有底线的~</view>  
</view>
```


## 其他
- [语雀知识库链接](https://www.yuque.com/lexmin/rlww9b)





