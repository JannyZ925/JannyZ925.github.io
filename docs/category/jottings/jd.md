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

### 开发search组件

```html
<view class="search-container">
    <view class="search-input" @tap="clickSearchInputHandler">
        <icon class="search-icon" type="search" size="20"/>
        <text class="search-placeholder">搜索</text>
    </view>
</view>
```

```js
methods: {
    clickSearchInputHandler() {
        Taro.navigateTo({
        url: '/pages/subpkg/search/index'
        })
    }
}
```

### search 页面

#### 获取搜索结果

js代码：

```js
//  src/pages/subpkg/search/index.vue

// 获取搜索结果
async getSearchResults() {
    loading(true);
    this.searchResults = await request(`/goods/search?keyword=${this.keyword}`);
    loading(false);
},

// 搜索框输入值改变事件
onChange(stateName, value) {
    // 将搜索框输入的值赋给keyword
    this[stateName] = value.trim();
    if(value.trim() === '') {
        this.searchResults = [] 
        return;
    }
    // 设置延时器，每0.5秒发一次请求，发请求之前要清除上一次的延时器
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.getSearchResults();
    }, 500);
}
```

search输入框：
```html
<!--  src/pages/subpkg/search/index.vue -->  

<view class="search-container">
    <AtSearchBar
        :value="keyword"
        :onChange="onChange.bind(this, 'keyword')"
        :onActionClick="()=>clickSearchButton(this.keyword)"
    />
</view>
```

搜索结果：
```html
<!--  src/pages/subpkg/search/index.vue -->  

<!-- 搜索结果 -->
<scroll-view class="search-results-container">
    <view
        class="search-results-item"
        v-for="(result, index) in searchResults"
        :key="index"
    >
        <view class="goods-name">{{ result.goodsName }}</view>
        <view class='at-icon at-icon-chevron-right'></view>
    </view>
</scroll-view>
```

::: warning 注意
    这里的事件函数如果要传递参数，不能直接写clickSearchButton(this.keyword)这样的形式，要写箭头函数，否则该函数体会立即执行
:::


#### 搜索历史

监听搜索历史数组的改变：
```js
watch: {
    searchHistory() {
      // 将搜索历史保存到本地
      Taro.setStorageSync("searchHistory", this.searchHistory);
    }
  }
```

搜索历史相关方法：
```js
// 点击搜索按钮事件
clickSearchButton(keyword) {
    // 将搜索关键词加入到搜索历史记录中
    this.searchHistory.push(this.keyword);
    this.goToGoodsList(keyword)
},

// 跳转到商品列表页面
goToGoodsList(keyword) {
    Taro.navigateTo({
        url: `/pages/subpkg/goodsList/index?keyword=${keyword}`,
    });
},


// 点清空按钮事件
clickCleanIconHandler() {
    Taro.showModal({
        content: "确认删除全部搜索历史？",
        success: (res) => {
            if (res.confirm) {
                // 将data中的搜索记录清空
                this.searchHistory = [];
            }
        },
    });
}
```

获取搜索历史：
```js
mounted() {
    // 从本地获取搜索历史
    this.searchHistory = Taro.getStorageSync("searchHistory") || "[]";
  }
```

对搜索历史数组进行处理：
```js
computed: {
    // this.searchHistory.reverse() 反转搜索历史数组,最后搜索的排在最前面
    /**
     * 使用Set进行去重
     * new Set(this.searchHistory.reverse())将Array转换为Set，进行去重
     * ...将Set转换为Array
     */
    histories() {
        return [...new Set([...this.searchHistory].reverse())];
    },
}
```

将数据渲染在页面上：
```html
<!--  src/pages/subpkg/search/index.vue -->  

<!-- 搜索历史 -->
<view class="search-history-container" v-if="searchHistory.length !== 0 && keyword === ''">
    <view class="search-history-title">
        <text>搜索历史</text>
        <view class='at-icon at-icon-trash' @tap="clickCleanIconHandler"></view>
    </view>
    <view class="search-history-list">
        <AtTag
            class="search-history-item"
            v-for="(history, index) in histories"
            :key="index"
            circle
            type="primary"
            size="normal"
            :onClick="()=>goToGoodsList(history)"
            >{{ history }}
        </AtTag>
    </view>
</view>
```

## “我的”模块的开发

### 登录

1. html部分

```html
<view class="login" v-if="showLogin">
    <AtForm class="form">
        <AtInput 
            name='phone' 
            title='手机号' 
            type='phone' 
            placeholder='请输入手机号' 
            :value="user.phone"
            :onChange="onChange.bind(this, 'phone')" 
            clear
        />
        <AtInput 
            name='password' 
            title='密码' 
            type='password' 
            placeholder='请输入密码' 
            :value="user.password"
            :onChange="onChange.bind(this, 'password')" 
            clear
        />
        <AtButton type="primary" class="submitBtn" :onClick="handleClickSubmitBtn">登录</AtButton>
    </AtForm>
    <view class="tip">未注册的手机号登录成功后将自动注册</view>
</view>
```

2. 准备参数

```js
// 用户的登录/注册信息
user: {
    phone: '',
    password: ''
}
```

3. 设计相关方法

```js
// 输入框的值改变
onChange(stateName, value) {
    this.user[stateName] = value;
},

async handleClickSubmitBtn() {
    loading(true, "登录中...")
    const res = await request('/user/login', "POST", this.user)
    const icon = res === "登录成功！" ? 'success' : 'error'
    Taro.showToast({
        title: res,
        icon,
        duration: 2000
    })
    Taro.setStorageSync('user', this.user)
    this.showLogin = false
}
```



## 其他
- [语雀知识库链接](https://www.yuque.com/lexmin/rlww9b)





