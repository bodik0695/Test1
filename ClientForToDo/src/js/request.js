export default function sendRequest({ method = 'GET', url = '/', type = 'application/json', data = {} }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let json = '';
        if (method === 'POST' || method === 'PUT') {
            json = JSON.stringify(data);
        }
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
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', type);
        xhr.send(json);
    }).then(res => res).catch(err => console.log(err));
}