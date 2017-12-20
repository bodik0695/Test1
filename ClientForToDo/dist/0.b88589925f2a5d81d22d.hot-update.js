webpackHotUpdate(0,{

/***/ "./src/js/request.js":
/***/ (function(module, exports) {

function sendRequest({ method = 'GET', url = '/', type = 'text/plain', data = {}, id }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.withCredentials = true;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`${xhr.status}: ${xhr.statusText}`));
                }
            }
        };

        if (method === 'GET') {
            if (id) {
                xhr.open(method, `${url}/${id}`, true);
                xhr.send();
            } else {
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
    }).then(res => console.log(res));
}

const reqGet = {
    method: 'GET',
    url: '/todos'
};
const reqGetId = {
    method: 'GET',
    url: '/todos',
    id: '5a3a2d65f77df20b30db92ae'
};
const reqPut = {
    method: 'PUT',
    url: '/todos',
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
    url: '/todos',
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