const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  done: {
      type: Boolean,
      required: true,
      default: false
  },
  todoText: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("Todo", TodoSchema);