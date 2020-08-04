const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve:{
        modules: [
            path.resolve('node_modules'),
            // path.resolve('dist') // 1
        ],
        // alias: { // 2
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        // mainFields:['style', 'main'] // 3 in node_modules/ .../package.json
        // mainFiles: [] // 4, entry file index.js by default
        extensions: ['.js', '.css', '.json'] // 5 import 'style', will search at first style.js then style.css and then json, once find, return  
    },
    devServer:{
        port: 8080,
        progress:true,
        contentBase: './dist',
        compress:true, //compress files gzip
    },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
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
            filename: 'index.html',
        }),
    ]
}