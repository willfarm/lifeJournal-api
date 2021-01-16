const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  author: String,
  imageUrl: String,
  contentUrl: String,
  title: String,
  blogText: String,
  blogType: String
});

module.exports = mongoose.model("Blog", BlogSchema);