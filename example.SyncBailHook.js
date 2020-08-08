let { SyncBailHook } = require('tapable');
// when function return an value is not undefined, stop rest function
class Lesson {
    constructor(){
        this.hooks = {
            arch: new SyncBailHook(['name']),
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tap('node', function(name){
            console.log("Lesson -> tap -> node start", name);
            return 'stop'; // will stop the tasks 
            // return undefined; // undefined will continue the tasks 
        });
        this.hooks.arch.tap('react', function(name){
            console.log("Lesson -> tap -> react start", name)
        });
    }
    start() {
        this.hooks.arch.call('wyy');
    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook