const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var jsPath = path.join(__dirname, './src');
var assetsPath = path.join(__dirname, './src/assets');

module.exports = {
    entry: __dirname + '/src/index.js',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/static/index.html',
            inject: 'body'
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    output: {
        filename: '[name].js?[hash:8]',
        chunkFilename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
        extensions: ['.js', '.jsx'],
        alias: {
            jscom: jsPath,
            assets: assetsPath,
        },
    },
    module: {
        rules: [{ // 0
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader', // compiles Less to CSS
                options: {
                    javascriptEnabled: true,
                }
            }]
        }, {
            test: /\.(js|jsx)?$/,
            use: ['babel-loader'],
            // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
            exclude: path.resolve(__dirname, 'node_modules'),
        }, { // 1
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [{
                loader: "file-loader",
                options: {
                    hash: "sha512",
                    digest: "hex",
                    name: "[path][name].[hash:8].[ext]"
                }
            }, {
                loader: 'image-webpack-loader',
            }]
        }, { // 2
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[hash:8].[ext]"
        }]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
            },
        },
    },
    mode: 'development',
    devtool: 'source-map',
};
