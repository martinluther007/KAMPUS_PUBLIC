const mongoose = require("mongoose");

const myspaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postedBy: String,
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Myspace = mongoose.model("myspace", myspaceSchema);

module.exports = Myspace;
