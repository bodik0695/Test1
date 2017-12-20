webpackHotUpdate(0,{

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

sendRequest('GET');

/***/ })

})