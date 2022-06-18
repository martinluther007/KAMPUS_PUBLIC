const mongoose = require("mongoose");
const validator = require("validator");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please put in your name"],
    maxlength: [60, "a maximum of 60 characters"],
    trim: true,
    unique: true,
  },
  dominantFoot: {
    type: String,
    required: [true, "please input your dominant foot"],
    enum: {
      values: ["left foot", "right foot", "both feet"],
      message: "{VALUE} is not supported",
    },
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: validator.isEmail,
  },
  nationality: {
    type: String,
    required: [true, "please out in your nationality"],
    max: [60, "a maximum of 60 characters"],
  },
  course: {
    type: String,
    required: [true, "please put in your course"],
  },
  position: {
    required: true,
    type: String,
  },
  age: {
    type: Number,
    required: [true, "please put in your age"],
  },
  dreamTeam: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: [true, "please put in your birth date"],
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  height: {
    type: Number,
    required: true,
    maxlength: [5, "a maximum of 5 characters"],
  },
  college: {
    required: [true, "please put in your school"],
    type: String,
    trim: true,
    max: [100, "a maximum of 100 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  facts: [
    {
      season: {
        type: Number,
        default: 1,
      },
      year: String,
      goals: String,
      assists: String,
      redCards: String,
      yellowCards: String,
      appearance: String,
      cleanSheet: String,
      isSuspended: {
        type: Boolean,
        default: false,
      },
      eliminated: {
        type: Boolean,
        default: false,
      },
      yellowCards: String,
      redCards: String,
    },
  ],
});

const Player = mongoose.model("player", playerSchema);
module.exports = Player;
