// webpack is written by node, running in node syntax 
const path = require('path'); // path.resolve() convert relative path to absolute path
const HtmlWebpackPlugin = require('html-webpack-plugin'); // associate html with js file

const insertAtTop = function(element) {
    var parent = document.querySelector('head');
    // eslint-disable-next-line no-underscore-dangle
    var lastInsertedElement =
      window._lastElementInsertedByStyleLoader;

    if (!lastInsertedElement) {
      parent.insertBefore(element, parent.firstChild);
    } else if (lastInsertedElement.nextSibling) {
      parent.insertBefore(element, lastInsertedElement.nextSibling);
    } else {
      parent.appendChild(element);
    }

    // eslint-disable-next-line no-underscore-dangle
    window._lastElementInsertedByStyleLoader = element;
  }

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css from js file to a link tag 

const OptimizeCssAssetsPlugin  = require('optimize-css-assets-webpack-plugin'); // minify css file to one line

const TerserWebpackPlugin = require('terser-webpack-plugin'); //  minify javascript, uglifyjs-webpack-plugin is replaced by terser-webpack-plugin
const { options } = require('less');

module.exports = {
    optimization: { // optimization items
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({ // minify JavaScript
                cache: true,
                parallel:true,
                sourceMap: true
            })
        ]
    },
    /* devServer: { // configuration of webpack-dev-server
        port: 3000,
        progress:true,
        contentBase: './dist',
        compress:true //compress files gzip
    }, */
    mode: 'development', // development, production
    entry: './src/index.js', // entry of packaging
    output: { // output file
        filename: 'bundle.[hash:8].js', // the name of package file
        path: path.resolve(__dirname,'dist'), // output file to be placed, must be a absolute path
                                        
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: 'index.html', // output html name
            /* minify: {
                removeAttributeQuotes: true, // remove ""
                collapseWhitespace: true, // collapse whitespace, make html file into one line
            }, */
            hash: true // add hash to js version
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[hash:8].css'
        }),
        new OptimizeCssAssetsPlugin() // minify css to one line
    ],
    module: {
        rules:[
            {
                test:/\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { // use babel-loader need to convert es6 to es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],  // enable decorator, check babel website
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }] // enable es6 class property, check babel website
                        ]
                    }
                }] 
                
            },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // extract css from js file to the css file
                    'css-loader', //@import 
                    'postcss-loader', // add web browser prefix
                ] 
                
            },
            {
                test:/\.less$/, // can process less, the same sass stylus..
                use: [
                    MiniCssExtractPlugin.loader, // extract css from js file to the css file
                    'css-loader',//@import 
                    'less-loader', // less->css
                    'postcss-loader', // add web browser prefix
                ] 
            }
        ]
    }
}