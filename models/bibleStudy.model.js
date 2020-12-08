const mongoose = require("mongoose");

const BibleStudySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  date: {
      type: Date,
      required: true,
      default: Date()
  },
  book: String,
  chapter: String,
  verse: String,
  bibleStudyText: String
});

module.exports = mongoose.model("BibleStudy", BibleStudySchema);