const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: false,
  },
  date: {
      type: Date,
      required: true,
      default: Date()
  },
  journalText: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("Journal", JournalSchema);