// html-webpack-plugin 通用基础配置

// inject 有以下配置选项
// 1, true或者body：所有JavaScript资源插入到body元素的底部
// 2, head: 所有JavaScript资源插入到head元素中
// 3, false： 所有静态资源css和JavaScript都不会注入到模板文件中


const htmlConfigCommon = {
    inject: true,  // 向template或者templateContent中注入所有静态资源。
    hash: false, // 是否开启hash
    minify: process.env.NODE_ENV === 'development' ? false : {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, //去除属性引用
    },
};
// 生成模板配置对象
const getHtmlConfig = ({
    title = '',
    chunkName = '',
}) => {
    return {
        templateContent: () => {
            return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui,viewport-fit=cover">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <meta content="yes" name="apple-mobile-web-app-capable">
                    <meta content="black" name="apple-mobile-web-app-status-bar-style">
                    <meta content="telephone=no" name="format-detection">
                </head>
                <body id='body' style="font-size:12px">
                    <div id="app"></div>
                </body>
            </html>`
        },
        filename: `./${chunkName}.html`,
        chunks: [chunkName],
        title: title,
        ...htmlConfigCommon
    }
}
module.exports = getHtmlConfig;