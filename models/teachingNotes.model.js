const mongoose = require("mongoose");

const TeachingNotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  date: {
      type: String,
      required: true,
  },
  teachingNotesText: {
      type: String,
      required: true
  },
  speaker: {
    type: String,
}
});

module.exports = mongoose.model("TeachingNotes", TeachingNotesSchema);