/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:51:49
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-17 01:08:11
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// environment variables config: dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// method to get index of html-webpack-plugin
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'camano-island-coffee': ['./src/page/camano-island-coffee/index.js'],
        'email': ['./src/page/common/email/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'list': ['./src/page/list/index.js'],
        'product': ['./src/page/product/index.js'],
        'detail': ['./src/page/detail/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.fashionforconservation.xyz/FFC_Frontend/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                } 
            }
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //independent common modules to /js.base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // package css into file
        new ExtractTextPlugin("css/[name].css"),
        // deal with html template
        new HtmlWebpackPlugin(getHtmlConfig('index', 'Home')),
        new HtmlWebpackPlugin(getHtmlConfig('camano-island-coffee', 'Camano Island Coffee')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', 'Register')),
        new HtmlWebpackPlugin(getHtmlConfig('list', 'Coupon List')),
        new HtmlWebpackPlugin(getHtmlConfig('product', 'Product List')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', 'Product Detail'))
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;