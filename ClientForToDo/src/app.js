import './scss/base.scss';
import Task from './js/task';
import sendRequest from './js/request';
import template from './templates/toDo.hbs';

function createHtml() {
    const content = document.getElementById('content');
    content.innerHTML = template({name: 'Hello'});
    console.log(template({name: 'Hello'}));
}
createHtml();