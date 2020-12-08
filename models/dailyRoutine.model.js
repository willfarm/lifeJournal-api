const mongoose = require("mongoose");

const DailyRoutineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  done: {
      type: Boolean,
      required: true,
      default: false
  },
  dailyRoutineText: {
      type: String,
      required: true
  },
  morning: Boolean,
  midDay: Boolean,
  night: Boolean
});

module.exports = mongoose.model("DailyRoutine", DailyRoutineSchema);