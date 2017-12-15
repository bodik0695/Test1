const todoRoutes = require('./todo_routes');
const poemRoutes = require('./poem_routes');

module.exports = function f(app, db) {
    todoRoutes(app, db);
    poemRoutes(app);
};
