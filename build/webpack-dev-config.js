const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack-base-config');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const config = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        open: false,
        host: 'localhost',
        port: '8081',
        hot: true,  //开启热更新
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].bundle.[hash].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 开启css 热更新的同时，需要配置这个插件  注意，需要在package.json 中的dev 中 配置 --hot --inline     
    ]
});

module.exports = smp.wrap(config);
