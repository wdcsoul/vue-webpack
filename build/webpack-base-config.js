const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html 模板
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue 项目必须引入的
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 代替dll
console.log(process.env.NODE_ENV);
let projectName = '';
if (process.env.NODE_ENV === 'development') {
    projectName = process.argv[3];
} else {
    projectName = process.argv[2];
}
const pageConfig = require(`./config/${projectName}.config`);
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const { entry, htmlTemple } = pageConfig
const config = {
    entry: entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 将第三方库提前打包,并且注入到html当中
        new webpack.optimize.SplitChunksPlugin(), // 提取公共代码，webpack 默认配置，也可以自己配置
        new HardSourceWebpackPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
        // extensions 属性是一个数组。这样配置之后，我们在 JavaScript 文件中 import JavaScript 文件、json 文件和 Vue 单文件组件都可以省略后缀。
        extensions: ['*', '.js', '.json', '.vue'],
    }
}
htmlTemple.forEach(ele => config.plugins.push(new HtmlWebpackPlugin(ele)));
module.exports = smp.wrap(config);
