const User = require("../models/user.model.js");
const Todo = require("../models/todo.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Todo content can not be empty",
    });
  }
  console.log(req.body);
  const todo = new Todo(req.body);

  let userId = req.body.user;
  User.findById(userId)
    .then((user) => {
      user.todo.push(todo);
      user.save();
      Todo.save().then((data) => {
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err || "no error");
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
exports.updateTodo = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Todo content can not be empty",
    });
  }
  let todoId = req.params.todoId;

  Todo.findOneAndUpdate({ _id: todoId }, req.body)
    .then((todo) => {
      if (!todo) {
        return res.status(400).send({ message: "can't find todo" });
      } else {
        return res.status(200).send(todo);
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: "can't find todo" });
    });
};

exports.getTodos = (req, res) => {
  let uid = req.params.uid;

  Todo.find({ user: uid })
    .then((bibleStudies) => {
      if (!bibleStudies) {
        return res.status(400).send({
          message: "No Todos Found",
        });
      }
      return res.status(200).send(bibleStudies);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
};
