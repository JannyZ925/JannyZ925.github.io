# 前台项目笔记
## 三级联动的路由跳转与传递参数（编程式导航+事件的委派）
> 注意：①如果跳转时传入的是params参数，则跳转路由只能写name，不能写path

## 开发Search模块中TypeNav商品分类菜单（动画效果）
1. 只有给元素加了 v-show 或 v-if 才能添加动画效果
2. 动画效果的类名要写在元素类名的后面，如：
    ```css
    .sort {}
    .sort-enter, .sort-leave-to{
      height: 0;
    }
    .sort-leave, .sort-enter-to{
      height: 460px;
    }
    .sort-enter-active, .sort-leave-active{
      overflow: hidden;
      transition: 0.5s linear;
    }
   ```
3. 要把overflow:hidden写在.sort-enter-active, .sort-leave-active中，否则二、三级分类不显示

## 合并 params 与 query 参数

## 开发首页中的 ListContainer 与 Floor 组件
1. 服务器没有提供 ListContainer 和 Floor 的数据，此时需要使用 mock 来模拟数据
2. 使用步骤
- 在项目的src文件夹中创建mock文件夹
- 准备JSON数据：在mock文件夹中创建对应的json文件
- 将mock数据需要的图片放置到public文件夹中（public文件夹在打包时，会把相应的资源原封不动地打包到dist文件夹）
- 创建mockServer.js，通过mockjs插件实现模拟数据
- 在入口文件中引入mockServer.js


## 开发 ListContainer 组件
1. 安装Swiper插件： npm i swiper
- 引包（相应的js、css）
- 写页面结构
- 创建swiper实例（new Swiper()，添加轮播图动态效果）

2. 在 ListContainer 的 mounted 中 new Swiper 实例，行不通，因为在 new Swiper 实例之前，页面中必须得有结构，但dispatch中涉及到异步语句，
   导致v-for遍历时还没有完整结构
   > 2-1 在mounted中加延时器可以解决，但不是最终解决方法，代码如下：
   ```js
   setTimeout(()=>{
      const mySwiper = new Swiper('.swiper-container',{
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          preEl: 'swiper-button-prev'
        }
      })
    }, 2000)
   ```
   > 2-2 完美解决方案：watch + nextTick，nextTick可以保证页面中的结构一定是有的，经常和插件一起使用，代码如下：
   ```js
   watch: {
    bannerList: {
      handler()
       {
        this.$nextTick(() => {
          const mySwiper = new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              preEl: 'swiper-button-prev'
            }
          })
        })
      }
   }
   }
   ```


## 开发 Floor 组件
1. getFloorList的action需要在Home组件中触发，因为不止一个Floor组件，需要v-for来遍历
   > v-for是可以在自定义标签中使用的，也就是可以在Home组件的<Floor/>上使用v-for来进行遍历

2. 组件通信的方式：
- props: 用于父子组件通信
- 自定义事件: $on $emit 用于子给父通信
- 全局事件总线: $bus 用于任意组件间通信
- pubsub-js: 用于任意组件间通信，但vue几乎不用
- 插槽
- vuex

3. Floor组件中有轮播图，千万不要忘记new Swiper实例，否则没有轮播图动态效果，代码如下：
   ```js
   mounted()
   {
    const mySwiper = new Swiper(this.$refs.mySwiper, {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        preEl: 'swiper-button-prev'
      }
    })
   }
   ```

## 将轮播图拆分为一个组件
   详情见Carousel/index.vue

## 开发 Search 模块
1. 步骤
- 静态页面、静态组件
- 发请求
- vuex
- 组件获取仓库数据，动态展示

2. 根据不同的参数获取数据展示
- 封装 getSearchResult 函数，需要时调用
- 监听路由，路由变化时再次发起请求
::: warning 注意
   这里点击“全部商品分类”中的任意分类进入搜索页面，显示的都是手机，是后端接口问题，只会返回默认数据，用Apipost可进行验证
:::

3. Search 子组件 SearchSelector 组件动态开发


