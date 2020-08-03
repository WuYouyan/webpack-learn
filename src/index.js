let xhr = new XMLHttpRequest();

// http://localhost:8080 default,  webpack-dev-server -transfer request to -> 3000 
// http-proxy
//1
// xhr.open('GET', 'http://localhost:8080/api/user', true);
//2
// xhr.open('GET', 'http://localhost:8080/user', true); // from before() in devServer of webpack.config.js
                                                        // webpack server transfer http request by proxy to localhost:3000
//3 browser: localhost:3000 will run index.js to get response from server.js (server port is webpack port because webpack is running on server )
xhr.open('GET', '/user', true); // from before() in devServer of webpack.config.js

xhr.onload = function() {
    console.log(xhr.response)
}

xhr.send();


// console.log('index');

// class Log {
//     constructor(){
//         console.log("Log -> constructor -> constructor");
//     }
// }

// let log = new Log(); 