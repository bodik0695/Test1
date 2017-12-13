const ObjectId = require('mongodb').ObjectID;

module.exports = function f(app, db) {
  app.get('/', (req, res) => {
    res.json({ message: 'welcome to our api!' });
  });

  app.get('/todos', (req, res, next) => {
    db.collection('toDoList').find().toArray((err, todos) => {
      if (err) {
        return next(err);
      }
      res.json(todos);
    });
  });

  app.get('/todos/:id', (req, res, next) => {
    const id = req.param('id');
    let details;
    try {
      details = { _id: ObjectId(id) };
    } catch (e) {
      return next(new Error('incorrect data'));
    }

    db.collection('toDoList').findOne(details, (err, item) => {
      if (err) {
        return next(err);
      }
      if (Object.is(item, null)) {
        return next(new Error('not found'));
      }
      res.json(item);
    });
  });

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
      res.json({ message: 'todo created!' });
    });
  });

  app.put('/todos', (req, res, next) => {
    const id = req.body._id;
    if (!id) {
      return next(new Error('incorrect data'));
    }
    let details;
    try {
      details = { _id: ObjectId(id) };
    } catch (e) {
      return next(new Error('incorrect data'));
    }

    const item = {
      $set: {
        title: req.body.title,
        text: req.body.text,
        status: req.body.status,
        changeAt: new Date().toString(),
      },
    };
    db.collection('toDoList').updateOne(details, item, (err) => {
      if (err) {
        return next(err);
      }
      if (Object.is(item, null)) {
        return next(new Error('not found'));
      }
      res.json({ message: 'todo updated!' });
    });
  });
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
