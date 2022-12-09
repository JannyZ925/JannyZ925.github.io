# uniapp项目遇到的一些问题

## 商品列表

### 1、在手机上拉触底事件没效果（已解决）
把每页显示的数据条数调大一点就可以了


## 购物车

### 1、在购物车中点击number-box修改商品数量，也会进入商品详情页面（已解决）
点击事件无法获取标签名或其他信息，只能在商品名称和商品图片上分别添加点击跳转事件

### 2、调用uni.chooseAddress()，除了微信开发者工具都不起作用（已解决）
在manifest.json中"mp-weixin"的"usingComponents"同级添加如下代码：
```
"requiredPrivateInfos": [
      "chooseAddress"
    ]
```

### 3、settle组件在H5端无法实现吸底效果





