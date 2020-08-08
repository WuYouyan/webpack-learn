let { SyncLoopHook } = require('tapable');
// run a function several times until reach the assigned times
class Lesson {
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name']),
        }
    }
    tap() { // register Monitor function
        this.hooks.arch.tap('node', name => {
            console.log("Lesson -> tap -> node start", name);
            return ++this.index<3 ? 'node is good': undefined; 
        });
        this.hooks.arch.tap('react', data => {
            console.log("Lesson -> tap -> react start", data);
        });
    }
    start() {
        this.hooks.arch.call('wyy');
    }
}

let l = new Lesson();
l.tap(); // register events
l.start(); // trigger hook