const mongoose = require("mongoose");

const PrayerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    index: true
  },
  date: {
    type: String,
  },
  prayerText: {
    type: String,
    required: true,
  },
  done: Boolean,
  isLongForm: Boolean,
});

module.exports = mongoose.model("Prayer", PrayerSchema);
