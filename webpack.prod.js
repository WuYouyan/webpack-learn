//webpack.prod.js for production configuration
let { merge  } = require('webpack-merge');

let base = require('./webpack.base.js');

module.exports = merge (base, {
    mode: 'production',
    optimization: {
        minimize:[]
    },
    plugins: []
})