let { AsyncParallelBailHook } = require('tapable');
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
            arch: new AsyncParallelBailHook(['name'])
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tapPromise('node', name => {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    console.log("Lesson -> tap -> node start", name)
                    rej('node rejects'); 
                    // rej(); // equivalent to res() or res('hello')
                }, 1000);
            })
        });
        this.hooks.arch.tapPromise('react', name => {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    console.log("Lesson -> tap -> react start", name)
                    res(); 
                }, 3000);
            })
        });
    }
    start() {
        /* 1 then(success(), error())
         this.hooks.arch.promise('wyy').then(
            (success) => { 
               console.log("end: ", success);
            }, (err) => {
                console.log("catch error:", 'someone rejects and emits value:\n  '+ err);
           }
        ); */
        // 2 then().catch()
        this.hooks.arch.promise('wyy').then(
            (success) => { 
               console.log("end: ", success);
        }).catch( 
            (err) => {
                console.log("catch error:", 'someone rejects and emits value:\n  '+ err);
            }
        );
    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook