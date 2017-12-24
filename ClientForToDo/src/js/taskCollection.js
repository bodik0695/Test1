import sendRequest from './request';
import template from './../templates/toDo.hbs';

export default class Tasks {
    constructor(tasksMap) {
        this.data = {
            tasksMap
        };
    }
    async initilize() {
        this.data.getReq = {
            method: 'GET',
            url: '/todos'
        };
        let tasks = await sendRequest(this.data.getReq);
        // for (let i of tasks) {
        //     this.data.tasksMap.set(i._id, i);
        // };
        this.render(tasks);
        this.data.addBtn = document.getElementById('addTask');
        // let arr = [];
        // for (let i of this.data.tasksMap.values()) {
        //     arr.push(i);
        // };

    }
    eventHandlers() {
        this.data.addBtn.addEventListener('click', function(e) {
            e.preventDefault();
        });
        this.data.addBtn.addEventListener('click', this.addTask);
        
        this.data.delBtns = document.getElementsByClassName('task_delBtn');
        for (let delBtn of this.data.delBtns) {
            delBtn.addEventListener('click', this.delTask);
        }
    }
    async addTask() {
        let newTitle = document.getElementById('newTitle').value;
        let newText = document.getElementById('newText').value;
        document.getElementById('newTitle').value = '';
        document.getElementById('newText').value = '';
        if (newTitle && newText) {
            let postReq = {
                method: 'POST',
                url: '/todos',
                data: {
                    title: newTitle,
                    text: newText,
                    status: 0
                }
            };
            let postRes = await sendRequest(postReq);
            location.reload();
        }
    }
    render(tasks = []) {
        document.getElementById('content').innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = template({tasks});
    }
    async delTask(e) {
        e.preventDefault();
        
        for (let i of e.path) {
            let delReq;
            if (!Object.is(i.id, undefined) && i.id !== '' && i.id.length === 24) {
                delReq = {
                    method: 'DELETE',
                    url: `/todos/${i.id}`
                };

                let postRes = await sendRequest(delReq);

                if (!Object.is(postRes, undefined)) {
                    location.reload();
                }
            }
        }
    }
    // showTask() {}
    // showTasks() {}
    // updateTask() {}
}