let { SyncWaterfallHook } = require('tapable');
// SyncWaterfallHook when encounter someone function who don't return undefined, will run this function many times
class Lesson {
    constructor(){
        this.hooks = {
            arch: new SyncWaterfallHook(['name']),
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tap('node', function(name){
            console.log("Lesson -> tap -> node start", name);
            return 'node is good'; // will be passed to next function
        });
        this.hooks.arch.tap('react', function(data){
            console.log("Lesson -> tap -> react start", data)
        });
    }
    start() {
        this.hooks.arch.call('wyy');
    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook