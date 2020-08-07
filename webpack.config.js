
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    // mode:'development',
    mode:'production',
    entry: {
        index: './src/index.js',
    },
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
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        })
    ]
}