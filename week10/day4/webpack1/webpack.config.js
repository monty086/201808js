let path = require('path');

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
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
        ]
    }
}

