## 虚拟DOM
Virtual Dom 并不是真正意义上的 DOM，而是一 个轻量级的 JavaScript 对象，在状态发生变化时， Virtual Dom 会进行 Diff 运算，来更新只需要被 替换的 DOM，而不是全部重绘。

## vue实现实时编译
Webpack-dev-server

## MVVM
model 代表数据模型    
view 代表 ui     
viewModel 监听模型数据的改变和控制视图行为、处理用户交互     
view 和 model 之间没有直接联系，是通过viewmodel进行交互，model和viewmodel之间的交互式双向的，因此view数据的变化会同步到model中，而model数据的变化也会反映到view上

## vue双向数据绑定原理
Object.defineProperty(obj, prop, descriptor)    //要在其上定义属性的对象, 要定义或修改的属性的名称, 将被定义或修改的属性描述符     
vue采用的是数据劫持（发布者和订阅者）来做数据绑定，核心就是 Object.defineProperty(),劫持各个属性的 getter和setter，在数据模型变化的时候，发布消息给订阅者，来触发相应的监听回调    
// vue中的实现    
// 当我们 new vue() 一个实例时,会传进去一个data对象,之后会分成两个进程，一个是对挂载目标元素解析编译模板指令，另一个是会对这个data对象里面的数据进行监听，最终达到数据变化-->视图的更新，视图的交互变化-->数据model的更新的双向绑定的效果
```javascript
// 简单实现
var obj = {}
Object.defineProperty(obj, 'hello', {
    set: function(newVal) {
        document.getElementById('a').value = newVal
        document.getElementById('b').innerHTML = newVal
    }
})
document.addEventListener('keyup', function(e) {
    obj.hello = e.target.value
})
```

## vue生命周期
1. beforeCreate()用的比较少
2. created()常用于简单的ajax请求(可以调用data，methods，computed，watch。。。)
3. beforeMounted()挂载之前
4. mounted()实例挂载到DOM上(可以访问DOM节点，ajax请求)
5. beforeUpdated()响应式数据更新之前
6. updated()更新之后
7. beforeDestroy()实例销毁之前调用(可以清除定时器之类的任务)
8. destroyed()实例销毁之后

## vue-router
1. vue-router是如何页面无刷新跳转的
    - vue-router 有两种运行模式
        * hash 默认模式
        URL后面会有一个#号，后面的hash值变化，不会导致浏览器向服务器发出请求，也就不会刷新页面，每个hash值变化，会触发hashchange事件，通过这个事件来更新页面
        * history 模式
        是通过pushState和replaceState这两个API来改变URL，这两个API改变URL不会像服务器发出请求
2. 路由拦截
    - `router.beforeEach((to, from, next) => {}) `   
3. 路由传参
    - `this.$router.push({path:`/login/${id}`})`    需要在路由后加/:id
    - params `this.$router.push({ name: 'Describe', params: { id: id } })` 通过 `this.$route.params.id` 取 刷新不在
    - query `this.$router.push({ path: '/describe', query: { id: id } })` 通过 `this.$route.query.id` 取  刷新还在

## vue 页面缓存(keep-alive)
1. 两个属性 
    - include 名称匹配的组件会被缓存，（字符串或正则）
    - exclude 任何名称匹配的组件都不会被缓存（字符串或正则）
2. 生命周期
    - activated 组件被激活时调用，每次keep-alive激活时被调用 
    - deactivated  组件被停用时调用

## 混入miXin
混入miXin提供了一种非常灵活的方式，来分发vue组建中可复用功能，一个混入对象可以包含任意组件选项，当组件使用混入对象时所有混入对象的选项被混合进入该组件本身的选项，跟页面初始化一样，有生命周期，方法，数据等等。。。生命周期是先调用混入的，在调用组件的，当发生冲突时以组件的为主

## vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理    
Vuex包含五个属性：state、getter、mutation、action、module    
1. state 存储数据，可通过 this.$store.state.xxx来访问数据
2. getter store的计算属性
3. mutation 更改vuex的store中的状态唯一的方法提交mutation
4. action 包含任意异步操作，通过提交mutation间接改变状态
5. module 将store分割成模块









Vue打包后出现一些map文件的解决办法：去src/config/index.js中改一个参数：productionSourceMap:false    
vue想在域名后面多加字段： 去src/config/index.js中改一个参数：assetsPublicPath: '/字段名/',（文件夹名）    
npm install live-server -g     vue 中 打包 在 dist 目录下 执行 live-server     
本机ip加端口号访问    
ngrok + live-server    