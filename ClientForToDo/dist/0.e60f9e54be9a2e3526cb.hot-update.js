webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

function sendRequest({method, mype, data, id}) {
    // const method = method;
    // const type = type;
    // const data = data;
    // const id = id;
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
let request1 = {
    method: 'GET'
};
let request2 = {
    method: 'GET',
    id: '5a3a2d81f77df20b30db92af'
};
sendRequest(request1);
sendRequest(request2);

/***/ })

})