let { AsyncSeriesHook } = require('tapable');

class Lesson {
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tapPromise('node', name => {
            return new Promise((res, rej)=> {
                setTimeout(() => {
                    console.log("Lesson -> tap -> node start", name)
                    res();
                }, 1000);
                
            })
        });
        this.hooks.arch.tapPromise('react', name => {
            return new Promise((res, rej)=> {
                setTimeout(() => {
                    console.log("Lesson -> tap -> react start", name)
                    res();
                }, 1000);
            });
        })
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