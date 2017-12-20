webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

// const url = 'http://localhost:3000';

function sendRequest({ method = 'GET', path = '/', type = '', data = {}, id }) {
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
    if (method === 'GET' || method === 'DELETE') {
        if (id) {
            xhr.open(method, `${path}/${id}`, true);
            xhr.send();
        } else {
            xhr.open(method, path, true);
            xhr.send();
        }
    } else if (method === 'POST' || method === 'PUT') {
        if (data && Object.is(type, 'application/json')) {
            xhr.open(method, path, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
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