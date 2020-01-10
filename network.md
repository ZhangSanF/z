## 浏览器输入地址后发生什么
1. 操作系统访问网络上的DNS服务器，把域名转为IP地址
2. 浏览器发起http请求
3. web服务器接收解析请求消息，查找资源，返回
4. 浏览器接收解析，响应渲染

## http
http协议是一种网络上的标准，用于传送网页，请求（请求起始行，请求头，请求主体）,响应（响应起始行，响应头，响应主体）    
状态码    
1. 200 成功
2. 304 使用缓存
3. 400 请求语法错误
4. 403 拒绝服务
5. 404 资源不存在
6. 500 服务器错误

## Ajax
原理：通过XMLHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用js来操作DOM来更新页面
1. 创建XMLHttpRequest对象
2. 绑定 onreadystatechange事件，监听服务器端通信状态
3. 创建服务器连接open
4. 发送请求 send

## 跨域
1. proxy代理: 现在用的比较多，现在都是用webpack构建项目，在vue中config目录下的index.js中配置proxyTable
2. cors 要在服务器端的response header里配置 Access-Control-Allow-Origin: 指定域名
3. JSONP 