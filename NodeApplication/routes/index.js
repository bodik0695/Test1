const todoRoutes = require('./todo_routes');

module.exports = function f(app, db) {
  todoRoutes(app, db);
};
