let { AsyncSeriesWaterfallHook } = require('tapable');

class Lesson {
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log("Lesson -> tap -> node start", name)
                // cb(error, result); // 
                // cb(null, 'hello from node');
                cb('null', 'hello from node'); // stop running the rest registered function  
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log("Lesson -> tap -> react start", name)
                cb();
            }, 1000);
        });
    }
    start() {
        this.hooks.arch.callAsync('wyy',
            () => { //callback functions is called when all callbacks are finished 
                console.log("end");
            }
        );


    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook