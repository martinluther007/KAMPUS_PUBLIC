const mongoose = require('mongoose');
const User = require('../userModel');
const Trivia = require('./triviaModel');

const triviaWinnerSchema = new mongoose.Schema({
    trivia:{
        required:true,
        type:mongoose.Schema.ObjectId,
        ref:Trivia,
    },
    winner:{
        type:mongoose.Schema.ObjectId,
        required:[true,'there must be a winner present'],
        ref:User,
    }
});

triviaWinnerSchema.pre(/^find/,function(next) {
    this.populate({
        path:'trivia',
        select:'triviaNumber'
    }).populate({
        path:"winner"
    })
    next()
})

const TriviaWinner = mongoose.model('triviaWinner',triviaWinnerSchema)

module.exports = TriviaWinner;