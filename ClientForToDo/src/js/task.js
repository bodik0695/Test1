export default class Task {
    constructor(id = 'empty', title = 'empty', text = 'empty', status = 0, createAt = 'empty', changeAt = 'empty') {
        this._id = id;
        this._title = title;
        this._text = text;
        this._status = status;
        this._createAt = createAt;
        this._changeAt = changeAt;
    }
    changeStatus(status) {
        if (Object.is(typeof status, 'number') && status === 0 || status === 1) {
            this._status = status;
        }
    }
    changeAll(title, text, status) {
        this._title = title;
        this._text = text;
        if (Object.is(typeof status, 'number') && status === 0 || status === 1) {
            this._status = status;
        }
    }
}