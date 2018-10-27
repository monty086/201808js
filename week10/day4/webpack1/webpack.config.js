let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin')
// 遵循common.js规范

// 默认导出对象

module.exports = {
    // 入口文件
    entry:'./src/main.js',
    // 出口文件
    output:{
        // 出口的文件名 boundle.js[自定义]
        filename:'build.js',
        // 出口的路径[绝对路径]
        path:path.resolve(__dirname,'./dist')
    },
    // 对于模块的配置，相当于把模块引入，对文件进行编译在【打包文件之前】
    module:{
        rules:[
            // 将webpakc1当中的所有文件都进行编译，但是node_modules文件不要编译,指定版本的语言编译，=> .babelrc
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            // 将css文件编译压缩，然后再插入到style标签中
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            // 如果图片大约8000kb，就直接放到dist目录里，小于8000，转成二进制
            {test:/\.(png|jpg|gif)$/,use:'url-loader?limit=8000'},
            {test:/\.vue$/,use:'vue-loader'},
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            // 将这个路径下的indix.html文件,作为一个模板，放入dist文件夹当中，再将打包压缩后的build.js文件，默认引入到这index.html当中
            template:'./src/index.html'
        })
    ]
}

