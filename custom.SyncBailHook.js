class SyncBailHook { // synchronous hook
    constructor(args){
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let result;
        for(let task of this.tasks){
            if (result!==undefined) {
                break;
            }
            result = task(...args);
        }
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('node', function(name){
    console.log("node :", name)
    // return 'stop';
    return undefined;
});
hook.tap('react', function(name){
    console.log("react :", name)
});

hook.call('hello');