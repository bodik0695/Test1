webpackHotUpdate(0,{

/***/ "./src/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_unicorns__ = __webpack_require__("./src/js/unicorns.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_unicorns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_unicorns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_base_scss__ = __webpack_require__("./src/scss/base.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scss_base_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__scss_base_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_header_scss__ = __webpack_require__("./src/scss/header.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_header_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__scss_header_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_task__ = __webpack_require__("./src/js/task.js");





let task1 = new __WEBPACK_IMPORTED_MODULE_3__js_task__["a" /* default */]();
console.dir(task1);



/***/ }),

/***/ "./src/js/task.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Task {
    constructor(id = 'empty', title = 'empty', text = 'empty', status = 0, createAt = 'empty', changeAt = 'empty') {
        this._id = id;
        this._title = title;
        this._text = text;
        this._status = status;
        this._createAt = createAt;
        this._changeAt = changeAt;
    }
    ChangeStatus(status) {
        if (Object.is(typeof status, 'number') && status === 0 || status === 1) {
            this.status = status;
        }
    }
    changeAll(title, text, status) {
        this.title = title;
        this.text = text;
        this.status = status;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Task;


/***/ })

})