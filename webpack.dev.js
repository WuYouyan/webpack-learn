//webpack.dev.js for development configuration
let { merge  } = require('webpack-merge');

let base = require('./webpack.base.js');


module.exports = merge (base, {
    mode: 'development',
    devServer: {

    }
})