var path = require('path')
var URL="https://500.227290.com/"; //转发服务器地址
// var URL="https://www-testing-dev.e2048.com/"; //转发服务器地址
module.exports = {
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, "public"), //web为当前目录下的要访问web站点路径 可以是多级子目录，要访问当前根目录可以注释这行
        proxy: { //接口转发
            '/all': {
                target: URL, //转发的域名
                // target: 'https://www-xiaojufu-gray.e2048.com/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/all': '/all',	//转发的api
                   
                }
            },
            '/admin_static': {
                target: URL, // 接口的域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {'^/admin_static': '/admin_static'}  // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
            }
        }
    }
}