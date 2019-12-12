const webpack = require('webpack');
process.env.NODE_ENV = 'production';
const prodconfig = require('./webpack-prod-config');
webpack(prodconfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 在这里处理错误
        console.error(err);
        return;
    }
    // 处理完成
    console.log(stats.toString({
        chunks: false,  // 使构建过程更静默无输出
        colors: true    // 在控制台展示颜色
    }));
});
