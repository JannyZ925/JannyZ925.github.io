# JavaScript

## 数组

### 方法

1. reduce()

- 作用：对数组中的每个元素按序执行一个 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

::: warning 注意
第一次执行回调函数时，不存在“先前元素的计算结果”。若需要回调函数从数组索引为 0 的元素开始执行，则需传递初始值。否则数组索引为 0 的元素将被作为初始值，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。
:::

- 示例：求数组所有元素的和

```js
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const array = [1, 2, 3, 4];
const sum = array.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(sum); // 10
```

- 参数

  callBackFn

  - previosValue: 上一次调用 callBackFn 时的返回值
  - currentValue: 数组中正在处理的元素
  - currentIndex: 数组中正在处理的元素的索引
  - array： 用于遍历的数组

  initialValue

  - 作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

- 返回值：使用 reducer 回调函数遍历整个数组后的结果

- 栗子

  1). 累加对象数组中的值

  ```js
  let initialValue = 0;
  let array = [{ x: 1 }, { x: 2 }, { x: 3 }];
  let sum = array.reduce(
    (previousValue, currentValue) => previousValue + currentValue.x,
    initialValue
  );
  console.log(sum); // 6
  ```

  2). 将二维数组转化为一维

  ```js
  let array = [
    [0, 1],
    [2, 3],
    [4, 5],
  ];
  let newArray = array.reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue),
    []
  );
  console.log(newArray); // [1, 2, 3, 4, 5, 6]
  ```

  3). 计算数组中每个元素出现的次数

  ```js
  let names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
  let countedNames = names.reduce((allNames, name) => {
    if (name in allNames) allNames[name]++;
    else allNames[name] = 1;
    return allNames;
  }, {});
  console.log(countedNames); // {Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
  ```

### 实现数组去重的方法

```js
let ordinaryArray = [1, 2, 3, 1, 5, 3, 6, 8];
// 1、filter 与 indexOf 实现去重
let newArray1 = ordinaryArray.filter((item, index, ordinaryArray) => {
  return ordinaryArray.indexOf(item) === index;
});

// 2、reduce 与 includes 实现去重
let newArray2 = ordinaryArray.reduce((uniqueArray, item) => {
  return uniqueArray.includes(item) ? uniqueArray : [...uniqueArray, item];
}, []);

// 3、Set 实现去重
let set = new Set(ordinaryArray);
let newArray3 = Array.from(set);
```

### for...of 和 for...in 的区别

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

```js
Object.prototype.objCustom = function() {}
Array.prototype.arrayCustom = function() {}

let iterable = [3, 5, 7]
iterable.foo = 'hello'

for(let i in iterable) {
  console.log(i); // 0 1 2 foo arrayCustom objCustom
}

for(let i in iterable) {
  if(iterable.hasOwnProperty(i)) {
    console.log(i); // 0 1 2 foo
  }
}

for(let i of iterable) {
  console.log(i); // 3 5 7
}
```
