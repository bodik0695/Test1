webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('ok ', JSON.parse(xhr.responseText));
        } else {
            console.log(`${xhr.status}: ${xhr.statusText}`);
        }
    }
};
xhr.withCredentials = true;

const task1 = {
    title: 'title1',
    text: 'text1',
    status: 0,
};
//xhr.open('POST', '/todos', true);
//xhr.open('GET', '/todos', true);
//xhr.setRequestHeader("Content-Type", "application/json");
//xhr.send(JSON.stringify(task1));
xhr.open('GET', '/todos/5a3a2d65f77df20b30db92ae', true);
xhr.send();

/***/ })

})