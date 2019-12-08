const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack-base-config');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot:true,  //开启热更新
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()  // 开启css 热更新的同时，需要配置这个插件
  ]
});
