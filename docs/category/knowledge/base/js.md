# JavaScript

## 数组

### 方法

1. reduce()

- 作用：对数组中的每个元素按序执行一个 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

::: warning 注意
   第一次执行回调函数时，不存在“先前元素的计算结果”。若需要回调函数从数组索引为0的元素开始执行，则需传递初始值。否则数组索引为0的元素将被作为初始值，迭代器将从第二个元素开始执行（索引为1而不是0）。
:::

- 示例：求数组所有元素的和

```js
// 0 + 1 + 2 + 3 + 4
const initialValue = 0
const array = [1, 2, 3, 4]
const sum = array.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
console.log(sum)  // 10
```

- 参数

    callBackFn

    - previosValue: 上一次调用callBackFn时的返回值
    - currentValue: 数组中正在处理的元素
    - currentIndex: 数组中正在处理的元素的索引
    - array： 用于遍历的数组

    initialValue
    
    - 作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

- 返回值：使用 reducer 回调函数遍历整个数组后的结果


- 栗子

    1). 累加对象数组中的值

    ```js
    let initialValue = 0
    let array = [ {x: 1}, {x: 2}, {x: 3} ]
    let sum = array.reduce((previousValue, currentValue) => previousValue + currentValue.x, initialValue)
    console.log(sum) // 6
    ```

    2). 将二维数组转化为一维
    ```js
    let array = [ [0, 1], [2, 3], [4, 5] ]
    let newArray = array.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
    console.log(newArray) // [1, 2, 3, 4, 5, 6]
    ```

    3). 计算数组中每个元素出现的次数
    ```js
    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
    let countedNames = names.reduce(
        (allNames, name) => {
            if (name in allNames) allNames[name] ++ 
            else allNames[name] = 1
            return allNames
        }, {})
    console.log(countedNames); // {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
    ```

