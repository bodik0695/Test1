webpackHotUpdate(0,{

/***/ "./src/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_base_scss__ = __webpack_require__("./src/scss/base.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_base_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_base_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_task__ = __webpack_require__("./src/js/task.js");



const url = 'http://localhost:3000';
const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//             console.log('ok ', xhr.responseText);
//         } else {
//             console.log(`${xhr.status}: ${xhr.statusText}`);
//         }
//     }
// };
xhr.open('GET', url, true);
xhr.withCredentials = true;
//xhr.setRequestHeader('Credentials', 'value');
xhr.send();
console.dir(xhr);


/***/ })

})