const mongoose = require("mongoose");

const triviaSchema = new mongoose.Schema({
  questions: [
    {
      question1: {
        type: String,
        required: true,
      },
      option1A: {
        type: String,
        required: true,
      },
      option1B: {
        type: String,
        required: true,
      },
      option1C: {
        type: String,
        required: true,
      },
      option1D: {
        type: String,
        required: true,
      },
      answer1: {
        type: String,
        required: true,
      },
    },
    {
      question2: {
        type: String,
        required: true,
      },
      option2A: {
        type: String,
        required: true,
      },
      option2B: {
        type: String,
        required: true,
      },
      option2C: {
        type: String,
        required: true,
      },
      option2D: {
        type: String,
        required: true,
      },
      answer2: {
        type: String,
        required: true,
      },
    },

    {
      question3: {
        type: String,
        required: true,
      },
      option3A: {
        type: String,
        required: true,
      },
      option3B: {
        type: String,
        required: true,
      },
      option3C: {
        type: String,
        required: true,
      },
      option3D: {
        type: String,
        required: true,
      },
      answer3: {
        type: String,
        required: true,
      },
    },
    {
      question4: {
        type: String,
        required: true,
      },
      option4A: {
        type: String,
        required: true,
      },
      option4B: {
        type: String,
        required: true,
      },
      option4C: {
        type: String,
        required: true,
      },
      option4D: {
        type: String,
        required: true,
      },
      answer4: {
        type: String,
        required: true,
      },
    },
    {
      question5: {
        type: String,
        required: true,
      },
      option5A: {
        type: String,
        required: true,
      },
      option5B: {
        type: String,
        required: true,
      },
      option5C: {
        type: String,
        required: true,
      },
      option5D: {
        type: String,
        required: true,
      },
      answer5: {
        type: String,
        required: true,
      },
    },
    {
      question6: {
        type: String,
        required: true,
      },
      option6A: {
        type: String,
        required: true,
      },
      option6B: {
        type: String,
        required: true,
      },
      option6C: {
        type: String,
        required: true,
      },
      option6D: {
        type: String,
        required: true,
      },
      answer6: {
        type: String,
        required: true,
      },
    },
    {
      question7: {
        type: String,
        required: true,
      },
      option7A: {
        type: String,
        required: true,
      },
      option7B: {
        type: String,
        required: true,
      },
      option7C: {
        type: String,
        required: true,
      },
      option7D: {
        type: String,
        required: true,
      },
      answer7: {
        type: String,
        required: true,
      },
    },
    {
      question8: {
        type: String,
        required: true,
      },
      option8A: {
        type: String,
        required: true,
      },
      option8B: {
        type: String,
        required: true,
      },
      option8C: {
        type: String,
        required: true,
      },
      option8D: {
        type: String,
        required: true,
      },
      answer8: {
        type: String,
        required: true,
      },
    },
    {
      question9: {
        type: String,
        required: true,
      },
      option9A: {
        type: String,
        required: true,
      },
      option9B: {
        type: String,
        required: true,
      },
      option9C: {
        type: String,
        required: true,
      },
      option9D: {
        type: String,
        required: true,
      },
      answer9: {
        type: String,
        required: true,
      },
    },
    {
      question10: {
        type: String,
        required: true,
      },
      option10A: {
        type: String,
        required: true,
      },
      option10B: {
        type: String,
        required: true,
      },
      option10C: {
        type: String,
        required: true,
      },
      option10D: {
        type: String,
        required: true,
      },
      answer10: {
        type: String,
        required: true,
      },
    },
  ],
});

const Trivia = mongoose.model("trivia", triviaSchema);

module.exports = Trivia;
