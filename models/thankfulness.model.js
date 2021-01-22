const mongoose = require("mongoose");

const ThankfulnessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  date: {
      type: String,
      required: true,
  },
  thankfulnessText: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model("Thankfulness", ThankfulnessSchema);