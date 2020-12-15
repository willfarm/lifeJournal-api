module.exports = (app) => {
  const todo = require("../controllers/todo.controller");
  // Create a new Journal
  app.post("/todo", todo.create);

  //get all Bible Study for user
  app.get("/todo/:uid", todo.getTodos);

  //update Todo
  app.post("/todo/:todoId", todo.updateTodo);

  // // Retrieve a single journal with journalId
  // app.get("/journal/:userId", journal.getAllJournalsForUser);

  // // Update a journal with journalId
  // app.put("/journal/:journalId", journal.update);

  // // Delete a journal with journalId
  // app.delete("/journal/:journalId", journal.delete);
};
