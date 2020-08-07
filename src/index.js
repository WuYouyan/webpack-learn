import str from './source';
console.log("str: ", str)
if (module.hot) {
    module.hot.accept('./source', () => {
        console.log('file is updated');
        let str = require('./source').default;// or configure babel.config.json 
        console.log("str", str);
    })
}