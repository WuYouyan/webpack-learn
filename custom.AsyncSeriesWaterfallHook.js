
class AsyncSeriesWaterfallHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let callback = args.pop();
        let calledTimes = 1; 
        let next = (error, data) => {
            if (error) {
                return callback();
            }
            if (calledTimes === this.tasks.length) return callback();
            let task = this.tasks[calledTimes++];
            task(data, next);
        } 
        this.tasks[0](...args, next); // bootstrap first task
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('node', (name, cb) => {
    setTimeout(()=>{
        console.log("node :", name);
        // cb(null, 'hello from node');
        cb('null', 'hello from node'); // stop the rest registered function
    }, 1000);
});
hook.tapAsync('react', (name, cb) => {
    setTimeout(()=>{
        console.log("react :", name);
        cb();
    }, 1000);
});

hook.callAsync('hello', () => 
    console.log('end')
); 