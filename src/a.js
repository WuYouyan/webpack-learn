module.exports = 'world';// babel will cause :Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>' 
//issue: https://github.com/webpack/webpack/issues/4039
// fix : https://github.com/vuejs/vue-cli/issues/2746
// solution 1: add babel.config.js and mark sourceType: 'unambiguous' within
// solution 2: export default 'world'; // when babel-loader, need to replace module.exports with export defaulf 
//   when use solution 2, need const name = require('./a.js').default to import
/* 
it only occurred when trying to use CommonJS style module.exports inside of ES modules. require always works. 
This can be fixed by simply replacing all module.exports = ... to export default ... where applicable, 
as this is seemingly equivalent for old Babel-style ES module transpilation. 
*/
require('@babel/polyfill');

class B {}

function* gen(params) { // need babel runtime to coonvert generator function and promise.. advanced syntax
    yield 1;
}

console.log(gen().next());


console.log("'aaa'.includes('a'): ", 'aaa'.includes('a'))