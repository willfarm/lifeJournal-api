const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Reset", ResetSchema);
