const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// 1. clean-webpack-plugin // remove previous build automatically
// 2. copy-webpack-plugin  // copy files to build directory
// 3. banner-webpack-plugin (built-in) // add copy right
module.exports = {
    mode: 'development', 
    entry: {
        home: './src/index.js',
    },
    output: {
        filename: '[name].[hash:6].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
        }),
        new CleanWebpackPlugin(), 
        new CopyWebpackPlugin({
            patterns: [
                { from: './doc', to: './doc' },
              ],
        }),
        new webpack.BannerPlugin('Make 2019 by yy')
    ]
}