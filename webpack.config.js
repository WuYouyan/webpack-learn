// webpack is written by node, running in node syntax 
const path = require('path'); // path.resolve() convert relative path to absolute path

module.exports = {
    mode: 'development', // development, production
    entry: './src/index.js', // entry of packaging
    output: { // output file
        filename: 'bundle.js', // the name of package file
        path: path.resolve(__dirname,'dist'), // output file to be placed, must be a absolute path
                                        
    }, 
}