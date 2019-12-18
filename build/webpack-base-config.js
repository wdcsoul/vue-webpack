const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html 模板
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue 项目必须引入的
const { readJSONSync } = require('fs-extra');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 代替dll
let projectName = '';
let serverName = '';
if (process.env.NODE_ENV === 'development') {
    projectName = process.argv[3];
    serverName = process.argv[5];
} else if (process.env.NODE_ENV === 'production') {
    projectName = process.argv[2];
    serverName = process.argv[3];
}
console.log(projectName + '++++++++++++++++++++++++');
console.log(serverName + '++++++++++++++++++++++++');
const pageConfig = require(`./config/${projectName}.config`);
const serverConfig = path.resolve(__dirname, `./serverurl/${projectName}/${serverName}.json`);
const jsonObj = readJSONSync(serverConfig);
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
                test: /\.(css|less)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader', {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, '../src/assets/css/components-variates.less')
                            ]
                        }
                    }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 将第三方库提前打包,并且注入到html当中
        new webpack.HashedModuleIdsPlugin(),   // 修改webpack的默认的id 将id 修改为名称

        // webpack 在编译的时候设置全局常量 
        new webpack.DefinePlugin({
            serverURLbase: JSON.stringify('http://111.20.112.66:8081/mtex/webapp')
        })
        // new HardSourceWebpackPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'mtapp-ui': path.resolve(__dirname, '../coreLibs/mtapp-ui.min.js'),
            'mtapp-core': path.resolve(__dirname, '../coreLibs/mtapp-core.min.js'),
            'mtapp-wftask': path.resolve(__dirname, '../coreLibs/mtapp-wftask-min.js')
        },
        // extensions 属性是一个数组。这样配置之后，我们在 JavaScript 文件中 import JavaScript 文件、json 文件和 Vue 单文件组件都可以省略后缀。
        extensions: ['*', '.js', '.json', '.vue'],
    }
}
htmlTemple.forEach(ele => config.plugins.push(new HtmlWebpackPlugin(ele)));
module.exports = config;
