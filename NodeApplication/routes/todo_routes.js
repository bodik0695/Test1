const ObjectId = require('mongodb').ObjectID;

module.exports = function f(app, db) {
    app.get('/', (req, res) => {
        res.json({ message: 'welcome to our api!' });
    });

    /**
   * @api {get} /todos Request todo information
   *
   * @apiSuccess {Number} _id for each todo the unique ID.
   * @apiSuccess {String} title Title of the each todo.
   * @apiSuccess {String} text  Text of the each todo.
   * @apiSuccess {Number} status  Status of the each todo.
   * @apiSuccess {Data} creatAt time and date of creation todo.
   * @apiSuccess {Data} creatAt time and date of change todo.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *       {
   *            "_id": "5a3167cf2241b12938dff4c6",
   *            "title": "go to the shop",
   *            "text": "sugar, potato",
   *            "status": 0,
   *            "createAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))",
   *            "changeAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))"
   *        },
   *        {
   *            "_id": "5a3167d02241b12938dff4c7",
   *            "title": "repair the door",
   *            "text": "find the screws",
   *            "status": 0,
   *            "createAt": "Wed Dec 13 2017 19:48:00 GMT+0200 (Восточная Европа (зима))",
   *            "changeAt": "Wed Dec 13 2017 19:48:00 GMT+0200 (Восточная Европа (зима))"
   *        }
   *    ]
   *
   * @apiError Not Found todo in DB
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
  */
    app.get('/todos', (req, res, next) => {
        db.collection('toDoList').find().toArray((err, todos) => {
            if (err) {
                return next(err);
            }
            return res.json(todos);
        });
    });

    /**
   * @api {get} /todos/:id Request todo information
   *
   * @apiParam {Number} id todo unique ID.
   *
   * @apiSuccess {Number} _id for each todo the unique ID.
   * @apiSuccess {String} title Title of the todo.
   * @apiSuccess {String} text  Text of the todo.
   * @apiSuccess {Number} status  Status of the todo.
   * @apiSuccess {Data} creatAt time and date of creation todo.
   * @apiSuccess {Data} creatAt time and date of change todo.
   *
   * @apiSuccessExample Success-Response:
   *
   * {
   *    "_id": "5a3167cf2241b12938dff4c6",
   *    "title": "go to the shop",
   *    "text": "sugar, potato",
   *    "status": 0,
   *    "createAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))",
   *    "changeAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))"
   * }
   *
   * @apiError Not Found todo in DB
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *
   * @apiError Bad request incorrect id
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
  */
    app.get('/todos/:id', (req, res, next) => {
        const id = req.param('id');
        let details;
        try {
            details = { _id: ObjectId(id) };
        } catch (e) {
            return next(new Error('incorrect data'));
        }

        return db.collection('toDoList').findOne(details, (err, item) => {
            if (err) {
                return next(err);
            }
            if (Object.is(item, null)) {
                return next(new Error('not found'));
            }
            return res.json(item);
        });
    });

    /**
   * @api {post} /todos Create new todo
   *
   * @apiParam {String} title Title of the todo.
   * @apiParam {String} text  Text of the todo.
   * @apiParam {Number} status  Status of the todo.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200
   *    {
   *        "_id": "5a3167cf2241b12938dff4c6",
   *        "title": "go to the shop",
   *        "text": "sugar, potato",
   *        "status": 0,
   *        "createAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))",
   *        "changeAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))"
   *    }
   *
   * @apiError Bad request incorrect id
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   */
    app.post('/todos', (req, res, next) => {
        const item = {
            title: req.body.title,
            text: req.body.text,
            status: req.body.status,
            createAt: new Date().toString(),
            changeAt: new Date().toString(),
        };
        db.collection('toDoList').insertOne(item, (err) => {
            if (Object.is(req.body.title, undefined) ||
      Object.is(req.body.text, undefined) ||
       Object.is(req.body.status, undefined)) {
                return next(new Error('incorrect data'));
            }
            if (err) {
                return next(err);
            }
            // res.json({ message: 'todo created!' });
            db.collection('toDoList').find().toArray((findErr, todos) => {
                if (findErr) {
                    return next(findErr);
                }
                const newTask = todos.splice(todos.length - 1, 1);
                return res.json(newTask);
            });
        });
    });

    /**
   * @api {put} /todos Modify todo information
   *
   * @apiParam {Number} id todo unique ID.
   * @apiParam {String} title Title of the todo.
   * @apiParam {String} text  Text of the todo.
   * @apiParam {Number} status  Status of the todo.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200
   *    {
   *        "_id": "5a3167cf2241b12938dff4c6",
   *        "title": "go to the shop",
   *        "text": "sugar, potato",
   *        "status": 0,
   *        "createAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))",
   *        "changeAt": "Wed Dec 13 2017 19:47:59 GMT+0200 (Восточная Европа (зима))"
   *    }
   *
   * @apiError Not Found todo in DB
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *
   * @apiError Bad request incorrect id
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   */
    app.put('/todos/:id', (req, res, next) => {
        const id = req.param('id');
        let item;
        if (!id) {
            return next(new Error('incorrect data'));
        }
        let details;
        try {
            details = { _id: ObjectId(id) };
        } catch (e) {
            next(new Error('incorrect data'));
        }
        if (!req.body.title && !req.body.text) {
            item = {
                $set: {
                    status: req.body.status,
                    changeAt: new Date().toString(),
                },
            };
        } else {
            item = {
                $set: {
                    title: req.body.title,
                    text: req.body.text,
                    changeAt: new Date().toString(),
                },
            };
        }
        db.collection('toDoList').updateOne(details, item, (err) => {
            if (err) {
                return next(err);
            }
            if (Object.is(item, null)) {
                return next(new Error('not found'));
            }
            // res.json({ message: 'todo updated!' });
            db.collection('toDoList')
                .findOne(details, (findOneErr, changedItem) => res.json(changedItem));
        });
    });

    /**
   * @api {delete} /todos/:id Delete todo from DB
   *
   * @apiParam {Number} _id todo unique ID.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200
   *    {
   *      "message": "todo deleted!"
   *    }
   *
   * @apiError Not Found todo in DB
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *
   * @apiError Bad request incorrect id
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 400 Bad Request
   */
    app.delete('/todos/:id', (req, res, next) => {
        const id = req.param('id');
        if (!id) {
            return next(new Error('incorrect data'));
        }
        let details;
        try {
            details = { _id: ObjectId(id) };
        } catch (e) {
            return next(new Error('incorrect data'));
        }

        db.collection('toDoList').deleteOne(details, (err, item) => {
            if (err) {
                return next(err);
            }
            if (Object.is(item.deletedCount, 0)) {
                return next(new Error('not found'));
            }
            res.json({ message: 'todo deleted!' });
        });
    });
};
