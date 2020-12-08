const mongoose = require("mongoose");

const PrayerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  date: {
      type: Date,
  },
  prayerText: {
      type: String,
      required: true
  },
  answered: Boolean
});

module.exports = mongoose.model("Prayer", PrayerSchema);