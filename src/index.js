// import 'bootstrap/dist/css/bootstrap.css'; // 1
// import 'bootstrap'; // 2,3 alias in webpack.config.js 
// import './style.css'; // without extensions in webpack.config.js
import './style'; // 4

let xhr = new XMLHttpRequest();

xhr.open('GET', '/user', true); // from before() in devServer of webpack.config.js

xhr.onload = function() {
    console.log(xhr.response)
}

xhr.send();

