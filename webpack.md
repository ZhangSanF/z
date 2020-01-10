## webpack
webpack是一个模块打包工具，可以使用它管理项目中的模块依赖，并编译输出模块所需的静态文件。它可以很好地管理、打包开发中所用到的HTML,CSS,JavaScript和静态文件（图片，字体）等，让开发更高效。对于不同类型的依赖，webpack有对应的模块加载器，而且会分析模块间的依赖关系，最后合并生成优化的静态资源。    
常见的Loader
1. babel-loader 编译es6语法
2. css-loader style-loader 处理样式
3. file-loader url-loade 处理文件
4. source-map-loader 生成map文件 方便调试
常见的plugin    
1. tml-webpack-plugin 压缩html
2. uglifyjs-webpack-plugin 压缩es6代码
3. compression-webpack-plugin 压缩代码（打包优化）
Loader和Plugin的不同    
1. Loader直译为"加载器",用来加载和解析文件，比如解析es6语法的babel，scss-loader
2. Plugin直译为"插件"，用来扩展webpack的功能