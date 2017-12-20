webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

function sendRequest({method, type, data, id}) {
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
        } else {
            xhr.open(method, '/todos', true);
            xhr.send();
        }
    } else if (Object.is(method, 'POST') || Object.is(method, 'PUT')) {
        if (data && Object.is(type, 'application/json')) {
            xhr.open(method, '/todos', true);
            xhr.setRequestHeader('Content-Type', type);
            xhr.send(JSON.stringify(data));
        }
    }
}

const reqGet = {
    method: 'GET'
};
const reqGetId = {
    method: 'GET',
    id: '5a3a2d81f77df20b30db92af'
};
const reqPut = {
    method: 'PUT',
    type: 'application/json',
    data: {
        title: 'title5',
        text: 'text5',
        status: 0,
        id: '5a3a2d65f77df20b30db92ae',
    }
};
sendRequest(reqGet);
sendRequest(reqGetId);
sendRequest(reqPut);

/***/ })

})