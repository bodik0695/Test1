'use strict';

const express = require('express');
const EventEmitter = require('events');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const toDoDb = require('./config/toDoDB');
const testDb = require('./config/testDB');
const routes = require('./routes');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json(), (req, res, next) => {
    next();
});

app.use(methodOverride());

MongoClient.connect(testDb.url, (error, database) => {
    if (error) return console.log(error);
    routes(app, database);

    app.listen(port, () => console.log(`We are live on ${port}`));

    app.use((err, req, res, next) => {
        const isNotFound = err.message.indexOf('not found');
        const isCastError = err.message.indexOf('Cast to ObjectId failed');
        const isIncorrectDataError = err.message.indexOf('incorrect data');
        if (Object.is(isIncorrectDataError, 0)) {
            res.send(400);
        } else if (err.message && (isNotFound || isCastError)) {
            return next();
        }
        return res.status(500).json({ error: err.stack });
    });
    return app.use((req, res) => res.send(404));
});

module.exports = app;
