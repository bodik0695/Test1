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

function sendRequest({ method = 'GET', url = '/', type = 'text/plain', data = {}, id }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.withCredentials = true;

        if (method === 'GET') {
            if (id) {
                xhr.open(method, `${url}/${id}`, true);
                xhr.send();
            }
            else {
                xhr.open(method, url, true);
                xhr.send();
            }
        } else if (method === 'DELETE') {
            if (id) {
                xhr.open(method, `${url}/${id}`, true);
                xhr.send();
            }
        } else if (method === 'POST') {
            if (data && Object.is(type, 'application/json')) {
                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        } else if (method === 'PUT') {
            if (data && Object.is(type, 'application/json')) {
                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('ok ', JSON.parse(xhr.responseText));
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject( new Error(`${xhr.status}: ${xhr.statusText}`));
                }
            }
        };
    });

    return new Promise(newLocal);
}

const reqGet = {
    method: 'GET',
    path: '/todos'
};
const reqGetId = {
    method: 'GET',
    path: '/todos',
    id: '5a3a2d65f77df20b30db92ae'
};
const reqPut = {
    method: 'PUT',
    path: '/todos',
    type: 'application/json',
    data: {
        title: 'title5',
        text: 'text5',
        status: 0,
        _id: '5a3a2d65f77df20b30db92ae',
    },
};
const reqPost = {
    method: 'POST',
    path: '/todos',
    type: 'application/json',
    data: {
        title: 'title6',
        text: 'text6',
        status: 0,
    },
};
sendRequest(reqGet);
sendRequest(reqGetId);
sendRequest(reqPut);
sendRequest(reqPost);

/***/ })

})