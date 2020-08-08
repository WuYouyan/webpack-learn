let { SyncHook } = require('tapable');
// run every function
class Lesson {
    constructor(){
        this.hooks = {
            arch: new SyncHook(['name'])
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tap('node', function(name){
            console.log("Lesson -> tap -> node start", name)
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