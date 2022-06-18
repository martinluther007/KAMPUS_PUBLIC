const mongoose = require("mongoose");
const Player = require("./playerModel");
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a team must have a name"],
  },
  players: [
    {
      unique: [true, "a player can only belong to one team"],
      type: mongoose.Schema.ObjectId,
      ref: Player,
    },
  ],
  facts: [
    {
      season: {
        type: Number,
        default: 1,
      },
      year: String,
      gamesPlayed: String,
      gamesWon: String,
      gamesLost: String,
      gamesDrawn: String,
      goalsScored: String,
      goalsConceded: String,
      isEliminated: {
        type: Boolean,
        default: false,
      },
      yellowCards: String,
      redCards: String,
    },
  ],
});

teamSchema.pre(/^find/, function (next) {
  this.populate({
    path: "players",
  });
  next();
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
