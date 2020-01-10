## 节流和防抖
// 需求：短时间内快速触发多次事件，例（滚轮事件）发现单位时间内触发回调函数的次数太多，性能不好     
// 解决：让函数调用次数更少（节流和防抖）  
// 节流函数：在单位时间内让函数只调用一次，是第一次生效  
// 防抖函数：在单位时间内让函数只调用一次，是最后一次生效  
```javascript
// fn是我们需要包装的事件回调, interval是时间间隔的阈值(节流)
function throttle(fn, interval) {
    // last为上一次触发回调的时间
    let last = 0                
    // 将throttle处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()                   
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last >= interval) {
        // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
            last = now;
            fn.apply(context, args);
        }
    }
}
// 用throttle来包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)
```
```javascript
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间(防抖)
function debounce(fn, delay) {
  // 定时器
  let timer = null 
  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 每次事件被触发时，都去清除之前的旧定时器
    if(timer) {
        clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)
```
```javascript
// fn是我们需要包装的事件回调, delay是时间间隔的阈值(优化)
function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  // 将throttle处理结果当作函数返回  
  return function () { 
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()   
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
    }
  }
}
// 用新的throttle包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)
```

## 克隆
// 深度克隆: 把一个对象上的属性和方法复制到另一个对象上, 改变其中一个对象上的东西不影响另一个对象  
// 如何快速克隆一个数组或者是对象（不论是深克隆或者是浅克隆）   
```javascript
// 1. 扩展运算符
let newArr = [...oldArr]
let newObj = {...oldObj}
// 2. Object.assign
Object.assign({}, obj)
// 3.JSON.Stringify(oldArr)
let newArr = JSON.Parse(JSON.Stringify(oldArr))
```

## 判断是否为对象（类型检查）
```javascript
// 1. typeof
typeof 'str' // string 
typeof 123 // number
typeof true // boolean
var a
typeof a // undefined
typeof function () {} // function
typeof null // object
typeof {} // object
typeof [] // object
// 2. 区分对象和数组(instanceof)
{} instanceof Object    // true
[] instanceof Array     // true
Object.prototype.toString.call({})   //  "[object Object]"
Object.prototype.toString.call([])   //  "[object Array]"
{}.__proto__ === Object.prototype  // true
```

## call,apply,bind三个的区别及用处
1. 作用：改变函数执行时的上下文， 改变函数运行时的 this 指向
2. 区别：
    - call和apply改变了函数的this上下文后便执行该函数，而bind则是返回改变了上下文后的一个函数
    - call和apply的差别在于参数的区别，call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，
    apply则是以数组的形式展现
3. 用处：
    - 将伪数组转为数组
    ```javascript
    let arr2 = Array.prototype.slice.call(div);
    ```
    - 数组拼接
    ```javascript
    [].push.apply(arr1,arr2);  // 给arr1添加arr2
    ```
    - 判断变量类型
    ```javascript
    Object.prototype.toString.call({}) //  "[object Object]"
    ```
    - 继承

## js的事件循环机制(宏任务和微任务)
// 理解： js是一门单线程语言，在执行代码时只有一个主线程来执行所有的任务，也就是说同一个时间只能做同一件事情    
// 执行顺序： 同步-->异步-->回调    
宏任务：优先级为 setTimeout > setInterval > I/O     
微任务：优先级为 Promise > Object.observe > MutationObserver     
事件循环机制
1. 主线程执行 JavaScript 代码，形成执行上下文栈，将遇到的异步任务挂起，接受到响应结果后将异步任务放入对应的任务队列中，直到执行上下文栈只剩下全局上下文
2. 将微任务队列中的所有任务队列按优先级、单个任务队列的异步任务按先进先出（FIFO）的方式入栈并执行，直到清空所有的微任务队列
3. 将宏任务队列中优先级最高的任务队列中的异步任务按先进先出（FIFO）的方式入栈并执行
4. 复第 2 3 步骤，直到清空所有的宏任务队列和微任务队列，全局上下文出栈
```javascript
console.log('global');

setTimeout(function() {
    console.log('setTimeout1');
    new Promise(function(resolve) {
        console.log('setTimeout1_promise');
        resolve();
    }).then(function() {
        console.log('setTimeout1_promiseThen')
    })
},0)

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promiseThen1')
})

new Promise(function(resolve) {
    console.log('promise2');
    resolve();
}).then(function() {
    console.log('promiseThen2')
})

setTimeout(function() {
    console.log('setTimeout2');
},0)
// global  promise1  promise2  promiseThen1  promiseThen2  setTimeout1  setTimeout1_promise  setTimeout1_promiseThen  setTimeout2
```

## 处理异步函数
1. callback
2. promise
3. async await
4. Generator函数 function *(){}

## 一个['a','b']   如何快速变成{'a':0,'b':1}  es6  entries()
```javascript
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## 数组实例的 flat() 和 flatMap()
// 把多维数组转为一维数组(不改变原数组)
```javascript
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
[1, 2, [3, [4, 5]]].flat(Infinity) // [1, 2, 3, 4, 5]
```
// [1,2,3]如何快速变成[2,4,6]   就是数组中数组所以都快速翻一倍
```javascript
[1, 2, 3, 4].flatMap(x => [x * 2])
```

## 判断一个对象为空
1. JSON.stringify()
```javascript
if (JSON.stringify({a:1,b:2}) === '{}') {
    console.log(false) // 如果为空,返回false
}else {
    console.log(true) // 如果不为空，则会执行到这一步，返回true
}
```
2. Object.keys()
```javascript
if (Object.keys({}).length === 0) {
    return false // 如果为空,返回false
}else {
    return true // 如果不为空，则会执行到这一步，返回true
}
```
3. for in

## 排序
1. sort
```javascript
arr.sort((a,b) => {return a-b;})
```
2. 冒泡排序  遍历数组元素，两个一次比较，按大小调换顺序就可以了
```javascript
function bubbleSort(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < arr.length; j++) {
            if(arr[i] < arr[j]) {
                var temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}
var arr = [524, 684, 5, 69, 15];
bubbleSort(arr)   // 结果为[5, 15, 69, 524, 684]
```
3. 快速排序  将数组以一个基准分为两个部分，按大小分类，递归

## 去重
1. es6 Set()
```javascript
[...new Set(arr)] 
```
2. indexOf() includes()

## 闭包
1. 外部函数能够访问内部函数的变量
2. 闭包所在的函数变量不能被垃圾回收机制回收
3. 常驻内存，占用内存使用量
使用场景    
1. 给对象设置私有变量并且利用特权方法去访问私有属性
2. 采用函数引用方式的setTimeout调用
3. 封装相关功能集
```javascript
function fun(){
    var a = 10;//fun函数作用域内部的变量
    return ()=>{
        return a;//在此可以访问到fun函数作用域的a
    }
}
```

## Promise
promise是js异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一，他能很好的解决回调地域 可读性高，便于维护    
原理：在Promise的内部，有一个状态管理器的存在，有三种状态：pending、fulfilled、rejected。    
1. promise 对象初始化状态为 pending。
2. 当调用resolve(成功)，会由pending => fulfilled。
3. 当调用reject(失败)，会由pending => rejected。
promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变，当状态为fulfilled（rejected反之）时，then的成功回调函数会被调用，并接受传来的参数，进而进行操作。promise.then方法每次调用，都返回一个新的promise对象 所以可以链式写法（无论resolve还是reject都是这样）    
方法：then()  catch()  all() resolve() reject()
```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```