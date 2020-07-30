const name = require('./a.js');
console.log('hello '+ name);
require('./index.css');
require('./index.less');

let fn = () => {
    let el = document.getElementById('es6');
    el.innerText = 'hello es6 with babel';
    console.log('babel');
}

fn();

@log
class A {
    a;
    constructor(){
        this.a =1;
    }
} 
function log(target) {
    console.log('Decorator -> log -> new ',target.prototype.constructor.name+'()');
}

console.log("new A().a: ", new A().a)