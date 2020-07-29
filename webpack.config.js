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

module.exports = {
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
        })
    ],
    module: {
        rules:[
            {
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: { 
                            insert: insertAtTop //insert css to html's head
                        }
                    },
                    'css-loader' //@import 
                ] 
                
            },
            {
                test:/\.less$/, // can process less, the same sass stylus..
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert:  insertAtTop //insert css to html's head
                        }
                    },
                    'css-loader',//@import 
                    'less-loader' // less->css
                ] 
            }
        ]
    }
}