// import $ from 'expose-loader?exposes[]=$!jquery'; // inline loader, check npmjs expose-loader for usage
// import $ from 'jquery'; 
//expose-loader: expose jquery to global, inline loader,  // loader type pre normal inline post
import $ from 'jquery';
// 1. expose-loader : expose to global
// 2. webpack.ProvidePlugin: configure jquery for every module
// 3. script link jquery CDN,  import jquery but not packaging (jquery)
console.log($);
console.log('window.$: ',window.$); // jquery has been exposed to window (global scope)
