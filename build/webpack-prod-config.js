const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const baseConfig = require('./webpack-base-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取公共的css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
module.exports = merge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map',  // 用于生成.map 文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].[chunkhash:8].js',
        publicPath: ''
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    }
});