let button = document.createElement('button');

// lazy load
button.addEventListener('click', function(param){
    console.log('paramL ', param);
    // es6 jsonp realise dynamic loading
    import('./source.js').then(data => {
        console.log("data: ", data.default);
    })
});

button.innerText = 'click';

document.body.appendChild(button);
