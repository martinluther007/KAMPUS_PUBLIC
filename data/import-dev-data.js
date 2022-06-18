const fs = require("fs");
const Player = require("./../model/playerModel");
// const User = require('./../model/userModel');

const dotenv = require("dotenv");
dotenv.config({ path: `./../config.env` });
const mongoose = require("mongoose");

// connecting to our local database
mongoose
  .connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connected successfully again");
  });

let input = JSON.parse(
  fs.readFileSync(`${__dirname}/players-simple.json`, "utf-8")
);
// let userInput = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8'));

const importData = async () => {
  try {
    await Player.create(input);
    // await User.create(userInput)
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Player.deleteMany();
    // await User.deleteMany()
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
