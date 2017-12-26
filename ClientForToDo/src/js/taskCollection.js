import sendRequest from './request';
import template from './../templates/toDo.hbs';


export default class Tasks {
    constructor(tasksMap) {
        this.data = {
            tasksMap,
        };
    }
    bind(func, context) {
        return function f() {
            return func.apply(context, arguments);
        };
    }
    async initilize() {
        this.data.getReq = {
            method: 'GET',
            url: '/todos',
        };
        const tasks = await sendRequest(this.data.getReq);
        for (const i of tasks) {
            if (i.status === 0) {
                i.status = '';
            } else if (i.status === 1) {
                i.status = 'checked';
            }
        }
        // for (let i of tasks) {
        //     this.data.tasksMap.set(i._id, i);
        // };
        this.render(tasks);
        // let arr = [];
        // for (let i of this.data.tasksMap.values()) {
        //     arr.push(i);
        // };
    }
    render(tasks = []) {
        document.getElementById('content').innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = template({ tasks });
        this.eventHandlers();
    }
    eventHandlers() {
        this.data.addBtn = document.getElementById('addTask');
        this.data.addBtn.addEventListener('click', (e) => {
            e.preventDefault();
        });
        this.data.addBtn.addEventListener('click', this.bind(this.addTask, this), false);

        this.data.delBtns = document.getElementsByClassName('task_delBtn');
        for (const delBtn of this.data.delBtns) {
            delBtn.addEventListener('click', this.bind(this.delOne, this));
        }
        this.data.editBtns = document.getElementsByClassName('task_editBtn');
        for (const editBtn of this.data.editBtns) {
            editBtn.addEventListener('click', this.bind(this.editTask, this));
        }
        this.data.checkboxs = document.getElementsByClassName('taskCheckbox');
        for (const checkbox of this.data.checkboxs) {
            checkbox.addEventListener('click', this.bind(this.chengeStatus, this), false);
        }
        this.data.clearAll = document.getElementById('clearAll');
        this.data.clearAll.addEventListener('click', this.bind(this.delAll, this), false);
    }
    async addTask(e) {
        // e.stopPropagation();
        e.preventDefault();
        const newTitle = document.getElementById('newTitle').value;
        const newText = document.getElementById('newText').value;

        document.getElementById('newTitle').value = '';
        document.getElementById('newText').value = '';

        if (newTitle && newText) {
            const postReq = {
                method: 'POST',
                url: '/todos',
                data: {
                    title: newTitle,
                    text: newText,
                    status: 0,
                },
            };
            const postRes = await sendRequest(postReq);
            const tasks = await sendRequest(this.data.getReq);
            for (const y of tasks) {
                if (y.status === 0) {
                    y.status = '';
                } else if (y.status === 1) {
                    y.status = 'checked';
                }
            }
            this.render(tasks);
        }
    }
    async delOne(e) {
        e.preventDefault();

        for (const i of e.path) {
            let delReq;
            if (!Object.is(i.id, undefined) && i.id !== '' && i.id.length === 24) {
                delReq = {
                    method: 'DELETE',
                    url: `/todos/${i.id}`,
                };

                const delRes = await sendRequest(delReq);

                if (!Object.is(delRes, undefined)) {
                    const tasks = await sendRequest(this.data.getReq);
                    for (const y of tasks) {
                        if (y.status === 0) {
                            y.status = '';
                        } else if (y.status === 1) {
                            y.status = 'checked';
                        }
                    }
                    this.render(tasks);
                }
            }
        }
    }
    async chengeStatus(e) {
        for (const i of e.path) {
            if (!Object.is(i.id, undefined) && i.id !== '' && i.id.length === 24) {
                const li = document.getElementById(i.id);
                for (const liChildren of li.children) {
                    for (const formChildren of liChildren) {
                        if (formChildren.type === 'checkbox') {
                            let putReq;
                            let newStatus;
                            if (formChildren.checked) {
                                newStatus = 1;
                            } else {
                                newStatus = 0;
                            }
                            putReq = {
                                method: 'PUT',
                                url: '/todos',
                                data: {
                                    // title: newTitle,
                                    // text: newText,
                                    _id: i.id,
                                    status: newStatus,
                                },
                            };
                            const tasks = await sendRequest(putReq);
                        }
                    }
                }
            }
        }
    }
    async delAll() {
        const taskList = document.getElementById('tasksList');
        let tasks;
        for (const task of taskList.children) {
            const delReq = {
                method: 'DELETE',
                url: `/todos/${task.id}`,
            };
            const delRes = await sendRequest(delReq);
            if (!Object.is(delRes, undefined)) {
                tasks = await sendRequest(this.data.getReq);
                for (const y of tasks) {
                    if (y.status === 0) {
                        y.status = '';
                    } else if (y.status === 1) {
                        y.status = 'checked';
                    }
                }
            }
        }
        this.render(tasks);
    }
    async editTask(e) {
        e.preventDefault();
    }
}