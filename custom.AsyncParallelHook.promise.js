/* 
    3 types registration function:
    1.  tap -> call()
    2.  tapAsync -> callAsync()
    3.  tapPromise -> promise().then()
*/
class AsyncParallelHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let tasks = this.tasks.map(task=> task(...args));
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapPromise('node', name => {
    return new Promise( (res,rej)=>{
        setTimeout(()=>{
            console.log("node :", name);
            res();
        }, 1000);
    })
});
hook.tapPromise('react', name => {
    return new Promise( (res,rej)=>{
        setTimeout(()=>{
            console.log("react :", name);
            res();
        }, 3000);
    })
});

hook.promise('hello').then(() => 
    console.log('end')
); 