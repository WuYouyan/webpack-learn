class SyncLoopHook { // synchronous hook
    constructor(args){
        this.index = 0
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => {
            let result;
            do{
                result = task(...args);
            } while (result !== undefined)
            this.index=0;
        })
    }
}

let hook = new SyncLoopHook(['name']);
hook.tap('node', function(name){
    console.log("node :", name);
    return ++hook.index<3 ? 'node is good': undefined; 
});
hook.tap('react', function(name){
    console.log("react :", name);
});

hook.call('hello');