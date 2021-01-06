const mongoose = require("mongoose");

const DailyRoutineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    index: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
  dailyRoutineText: {
    type: String,
    required: true,
  },
  morning: Boolean,
  night: Boolean,
  currentDate: Date,
});

module.exports = mongoose.model("DailyRoutine", DailyRoutineSchema);
