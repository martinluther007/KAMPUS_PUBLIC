const mongoose = require("mongoose");
const Team = require("./teamModel");

const fixturesSchema = new mongoose.Schema({
  team_A: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Team,
    },
  ],
  team_B: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Team,
    },
  ],
  stage: {
    required: true,
    type: String,
    enum: [
      "group stage",
      "round of 16",
      "quarter finals",
      "semi finals",
      "finals",
    ],
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  goalsScoredByTeam_A: {
    type: Number,
    default: 0,
  },
  goalsScoredByTeam_B: {
    type: Number,
    default: 0,
  },
  facts: {
    manOfTheMatch: String,
    homeScorers: [
      {
        name: String,
        time: String,
        assist: String,
      },
    ],
    awayScorers: [
      {
        name: String,
        time: String,
        assist: String,
      },
    ],
    homeTeamYellowCards: [
      {
        name: String,
        time: String,
      },
    ],
    awayTeamYellowCards: [
      {
        name: String,
        time: String,
      },
    ],
    stadium: String,
    homeShots: String,
    awayShots: String,
    homePossession: String,
    awayPossession: String,
    homeFouls: String,
    awayFouls: String,
    homeSubs: [
      {
        in: String,
        out: String,
        time: String,
      },
    ],
    awaySubs: [
      {
        in: String,
        out: String,
        time: String,
      },
    ],
  },
});

fixturesSchema.pre(/^find/, function (next) {
  this.populate({
    path: "team_A",
    select: "name",
  }).populate({
    path: "team_B",
    select: "name",
  });
  next();
});
const Fixtures = mongoose.model("fixtures", fixturesSchema);

module.exports = Fixtures;
