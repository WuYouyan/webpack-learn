const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', 
    entry: {
        home: './src/index.js',
    },
    watch: true,  // watch build 
    watchOptions: {
        poll: 1000, // watch every 1000 ms
        aggregateTimeout: 1000, // debounce time
        ignored: /node_modules/ // ignore files
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
            filename: 'index.html',
        }),
    ]
}