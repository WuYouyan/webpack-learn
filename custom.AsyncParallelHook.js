class AsyncParallelHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let callbackCalledTimes = 0;
        this.tasks.forEach(task => {
            task(...args,()=>{
                callbackCalledTimes++;
                if (callbackCalledTimes==this.tasks.length) {
                    finalCallback();
                }
            });
        })
        // let waiting = setInterval(() => {
        //     if(this.callbackTimes>=this.tasks.length){
        //         finalCallback();
        //         clearInterval(waiting);
        //     } else {
        //         console.log('waiting for finishment...');
        //     }
        // }, 200);
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapAsync('node', (name, callback) => {
    setTimeout(()=>{
        console.log("node :", name);
        callback();
    }, 1000);
});
hook.tapAsync('react', (name, callback) => {
    setTimeout(()=>{
        console.log("react :", name)
        callback();
    }, 2000);
});

hook.callAsync('hello', () => console.log('end') );