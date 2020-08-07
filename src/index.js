import calc from './test.js'; // tree-shaking, in mode 'production' will remove unused code 

// es6 module will put imported result in default property
// let calc = require('./test').default;

console.log(calc.sum(1,2));

// scope hoisting
let a = 1;
let b = 1;
let c = 1;
let d = a+b+c; // will be optimized to 6 directly in  webpakck production mode
console.log("d", d)