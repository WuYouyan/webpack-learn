
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode:'development',
    entry: {
        // test: './src/test.js'
        react: ['react','react-dom']
    },
    // devServer: {
    //     port: 3000,
    //     open: true,
    //     contentBase: './dist'
    // },
    // module: {
    //     noParse: /jquery/, // do not resolve jquery's dependency repository
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/, // packaging optimization
    //             include: path.resolve('src'), // packaging optimization
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         '@babel/preset-env',
    //                         '@babel/preset-react'
    //                     ]
    //                 }
    //             }
    //         }
    //     ]
    // },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // _dll_react
        // library: 'ab', // ab
        // libraryTarget: 'commonjs', // export["ab"], likewise : umd,
        // libraryTarget: 'var', // var ab=...
    },
    plugins: [
        new webpack.DllPlugin({ // dll: Dynamic-link library
            name: '_dll_[name]', //name == library
            path: path.resolve(__dirname, 'dist', 'manifest.json'),
        })
        // when load 'moment' ignore 'locale/'
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/), // do not packaging all language modules from 'locale/'
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     filename: 'index.html',
        // })
    ]
}