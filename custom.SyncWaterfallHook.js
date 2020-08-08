class SyncBailHook { // synchronous hook
    constructor(args){
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let result;
        this.tasks.forEach(task => {
            if (result!==undefined) {
                result = task(result);
            } else {
                result = task(...args);
            }
        })
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('node', function(name){
    console.log("node :", name)
    return 'node is good';
});
hook.tap('react', function(name){
    console.log("react :", name)
});

hook.call('hello');