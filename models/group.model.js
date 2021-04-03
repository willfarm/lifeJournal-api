const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  groupName: String,
  contentUrl: String,
  groupCode: String,
  email: String,
  ownerName: String,
});

module.exports = mongoose.model("Group", GroupSchema);