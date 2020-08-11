/* 
    3 types registration function:
    1.  tap -> call()
    2.  tapAsync -> callAsync()
    3.  tapPromise -> promise().then()
*/
class AsyncParallelBailHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let tasks = this.tasks.map(task=> {
            return new Promise((res, rej)=>{
                task(...args).then(
                    success=> res(success),
                    error=> error? rej(error):res()
                )
            })
        });
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelBailHook(['name']);
hook.tapPromise('node', name => {
    return new Promise( (res,rej)=>{
        setTimeout(()=>{
            console.log("node :", name);
            rej();
        }, 1000);
    })
});
hook.tapPromise('react', name => {
    return new Promise( (res,rej)=>{
        setTimeout(()=>{
            console.log("react :", name);
            res('react sucess: '+ name);
        }, 3000);
    })
});

hook.promise('hello').then(
    (success) => { 
        console.log('end: '); 
        success.forEach(msg=> console.log('    '+msg))
    },
    (error) => console.log('error: ', error),
); 