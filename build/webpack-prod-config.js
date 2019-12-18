const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const baseConfig = require('./webpack-base-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取公共的css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const TerserPlugin = require("terser-webpack-plugin");  // 压缩js代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  // webpack 打包分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const seen = new Set();
const nameLength = 4;
const projectName = process.argv[2];
console.log(__dirname);
module.exports = smp.wrap(merge(baseConfig, {
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
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        // 动态
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return `${projectName}/${chunk.name}`;
            }
            const modules = Array.from(chunk.modulesIterable);
            if (modules.length > 1) {
                const hash = require("hash-sum");
                const joinedHash = hash(modules.map(m => m.id).join("_"));
                let len = nameLength;
                while (seen.has(joinedHash.substr(0, len))) len++;
                seen.add(joinedHash.substr(0, len));
                return `${projectName}/chunk-${joinedHash.substr(0, len)}`;
            } else {
                return `${projectName}/${modules[0].id}`;
            }
        }),
    ],
    // 代码分割
    optimization: {
        minimize: true,  // 是否开启webpack压缩
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /node_modules|lib/,
                    priority: 10,
                    chunks: "all" // 抽取项目中依赖的公共包，例如vue vuex vue-router
                },
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: require('os').cpus().length * 2,
                extractComments: false,
                cache: false,
                terserOptions: {
                    compress: {
                        drop_console: true, // true 标识删除所有log
                        drop_debugger: true,
                    },
                }
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
}));