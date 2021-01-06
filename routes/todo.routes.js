module.exports = (app) => {
  const todo = require("../controllers/todo.controller");

  // Create a new Todo
  app.post("/todo", todo.create);

  //get all Todo for user
  app.get("/todo/:uid", todo.getTodos);

  //update Todo
  app.post("/todo/:todoId", todo.updateTodo);

  //delete a todo
  app.post("todo/delete/:todoId", todo.deleteTodo);
};
