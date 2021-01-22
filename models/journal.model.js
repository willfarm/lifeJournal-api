const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  title: {
    type: String,
    required: false,
  },
  date: {
      type: String,
      required: true,
  },
  journalText: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("Journal", JournalSchema);