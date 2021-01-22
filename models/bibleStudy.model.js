const mongoose = require("mongoose");

const BibleStudySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  date: {
      type: String,
      required: true,
  },
  book: String,
  chapter: String,
  verse: String,
  bibleStudyText: String
});

module.exports = mongoose.model("BibleStudy", BibleStudySchema);