
class AsyncSeriesHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let callback = args.pop();
        let calledTimes = 0;
        let next = () => {
            if (calledTimes === this.tasks.length) return callback();
            let task = this.tasks[calledTimes++];
            task(...args, next);
        } 
        next();
    }
}

let hook = new AsyncSeriesHook(['name']);
hook.tapAsync('node', (name, cb) => {
    setTimeout(()=>{
        console.log("node :", name);
        cb();
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