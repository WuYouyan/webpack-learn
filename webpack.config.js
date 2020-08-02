const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //development, production
    entry: { // multiple entry
        home: './src/index.js',
    },
    output: {
        filename: '[name].[hash:6].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 1) source-map will generate separately a source map file, will report the position of error 
    // devtool: 'source-map', // add map file, help debugging
    // 2) eval-source-map, will not generate a source map file but alse report the position 
    // devtool: 'eval-source-map', // add map file, help debugging
    // 3) 'eval-source-map' will generate a map file(not show position of error), can be kept
    // devtool: 'cheap-module-source-map', // add map file, help debugging
    // 4) will not generate file, will be integrated in packaging file(will not show position of error)
    devtool: 'cheap-module-eval-source-map', 
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