
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    optimization: { // commonChunkPlugins before webpack 4
        splitChunks: {
            cacheGroups: { // extract order: from top to bottom
                common: {
                    chunks: 'initial',
                    minSize: 0, // when code size exceeds 0 size, extract common code
                    minChunks: 1 // common code is used by 1 more chunks, extract common code
                },
                vendor: { // third party module like jquery
                    priority: 1, // extract third party module first 
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0, // when code size exceeds 0 size, extract common code
                    minChunks: 1 // common code is used by 1 more chunks, extract common code
                }
            }
        }
    },
    // mode:'development',
    mode:'production',
    entry: {
        index: './src/index.js',
        other: './src/other.js'
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