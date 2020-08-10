let { AsyncParallelHook } = require('tapable');
// send multiple requests simultaneously
/* There are two types of asynchronous hooks: 
    1. Serial
    2. parallel  
        Need to wait for all concurrent asynchronous events to execute 
    before executing the callback function
 */
/* 
    3 types registration function:
    1.  tap -> call()
    2.  tapAsyn -> callAsync()
    3.  tapPromise -> promise().then()
*/
class Lesson {
    constructor(){
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve,reject)=> {
                setTimeout(() => {
                    console.log("Lesson -> tap -> node start", name)
                    resolve();
                }, 1000);
            });
        });
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve,reject)=> {
                setTimeout(() => {
                    console.log("Lesson -> tap -> react start", name)
                    resolve();
                }, 1000);
            });
        });
    }
    start() {
        this.hooks.arch.promise('wyy').then(
            () => { //callback functions is called when all callbacks are finished 
                console.log("end");
            }
        );
    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook