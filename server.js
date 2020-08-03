// express

let express = require('express');


let app = express();

/* 3 bootstrap webpack */
const webpack = require('webpack');
// middleware by using webpack-dev-middleware
const middle = require('webpack-dev-middleware');


let config = require('./webpack.config.js');
let compiler = webpack(config);
app.use(middle(compiler));
/* 3 bootstrap webpack */

app.get('/user', (req, res) => {
    res.json({name: 'learn webpack'});
});

const server = app.listen(3000,'localhost', ()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("application address: http://%s:%s", host, port);
    console.log("application is running...");
});