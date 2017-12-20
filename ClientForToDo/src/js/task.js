export default class Task {
    constructor(data) {
        this.data = data;
    }
    changeStatus() {
        if (this._status === 0) {
            this._status = 1;
            return;
        }
        this._status = 0;
    }
    update(title, text, status) {
        this._title = title;
        this._text = text;
        if (Object.is(typeof status, 'number') && status === 0 || status === 1) {
            this._status = status;
        }
    }
}