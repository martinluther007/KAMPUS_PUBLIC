const mongoose = require("mongoose");
const Team = require("./teamModel");

const groupSchema = new mongoose.Schema({
  teams: [
    {
      unique: [true, "this team belomgs to another group"],
      type: mongoose.Schema.ObjectId,
      ref: Team,
    },
  ],
  group: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "E", "F", "G", "H"],
  },
  qualified: {
    type: Boolean,
  },
  season: {
    default: 1,
    required: true,
    type: String,
  },
});

groupSchema.pre(/^find/, function (next) {
  this.populate({
    path: "teams",
    select: "name",
  });
  next();
});
const Group = mongoose.model("group", groupSchema);

module.exports = Group;
