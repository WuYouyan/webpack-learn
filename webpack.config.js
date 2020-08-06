
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// happypack : multi thread packaging
const Happypack = require('happypack');
module.exports = {
    mode:'development',
    entry: './src/index.js',
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/, // do not resolve jquery's dependency repository
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // packaging optimization
                include: path.resolve('src'), // packaging optimization
                use: 'Happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: 'Happypack/loader?id=css'
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Happypack({
            id: 'css',
            use: ['style-loader', 'css-loader']
        }),
        new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        }),
        new webpack.DllReferencePlugin({ // will check manifest first, if not find, will packaging required modules
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        // when load 'moment' ignore 'locale/'
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), // do not packaging all language modules from 'locale/'
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        })
    ]
}