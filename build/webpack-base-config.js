const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html 模板
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue 项目必须引入的
// const AutoDllPlugin = require('autodll-webpack-plugin');  // 将第三方库提前打包，官方推荐DllPlugins
const projectName = process.argv;
console.log(projectName + '------------------------------------');
const pageConfig = require('./config/testproject2.config');
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
        // 将第三方库提前打包
        // new AutoDllPlugin({
        //     inject: true,  // 设置为true 会自动将第三方文件引入到html中
        //     debug: true,
        //     filename: '[name]_[hash].js',  // 打包后的文件
        //     path: './dll',  // 打包之后的路径
        //     entry: {
        //         vendor: ['vue', 'vue-router', 'vuex']
        //     }
        // }),
        new webpack.optimize.SplitChunksPlugin() // 提取公共代码，webpack 默认配置，也可以自己配置
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
