import './scss/base.scss';
import Task from './js/task';
import sendRequest from './js/request';
import Tasks from './js/taskCollection'
import template from './templates/toDo.hbs';

document.addEventListener("DOMContentLoaded", () => {
    async function start() {
        const tasksMap = new Map();
        let tasksCollection = new Tasks(tasksMap);
        await tasksCollection.initilize();
        tasksCollection.eventHandlers();
    };
    start();
});