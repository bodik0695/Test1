webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('ok ', xhr.responseText);
        } else {
            console.log(`${xhr.status}: ${xhr.statusText}`);
        }
    }
};
xhr.open('GET', '/todos', true);
xhr.withCredentials = true;
xhr.send();
console.dir(xhr);


/***/ })

})