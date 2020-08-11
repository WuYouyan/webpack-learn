
class AsyncSeriesHook { // asynchronous hook
    constructor(args){
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let [first, ...rest] = this.tasks;
        return rest.reduce((p,n)=>p.then(()=>n(...args)), first(...args));
    }
}

let hook = new AsyncSeriesHook(['name']);
hook.tapPromise('node', name => {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("node :", name);
            res();
        }, 1000);

    });
});
hook.tapPromise('react', name => {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("react :", name);
            res();
        }, 1000);

    });
});

hook.promise('hello').then(() => 
    console.log('end')
); 