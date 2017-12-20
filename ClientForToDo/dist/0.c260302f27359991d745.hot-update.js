webpackHotUpdate(0,{

/***/ "./src/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_base_scss__ = __webpack_require__("./src/scss/base.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_base_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_base_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_task__ = __webpack_require__("./src/js/task.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_request__ = __webpack_require__("./src/js/request.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__js_request__);





/***/ }),

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

function sendRequest(Method, Type, Data, Id) {
    const method = Method;
    const type = Type;
    const data = Data;
    const id = Id;
    const xhr = new XMLHttpRequest();

    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('ok ', JSON.parse(xhr.responseText));
            } else {
                console.log(`${xhr.status}: ${xhr.statusText}`);
            }
        }
    };

    if (Object.is(method, 'GET') || Object.is(method, 'DELETE')) {
        if (id) {
            xhr.open(method, `/todos/${id}`, true);
            xhr.send();
        }
        xhr.open(method, '/todos', true);
        xhr.send();
    } else if (Object.is(method, 'POST') || Object.is(method, 'PUT')) {
        if (data && Object.is(type, 'application/json')) {
            if (Object.is(method, 'PUT')) {
                xhr.open(method, `/todos/${id}`, true);
            } else {
                xhr.open(method, '/todos', true);
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    } 
}


const task1 = {
    title: 'title1',
    text: 'text1',
    status: 0,
};


/***/ })

})