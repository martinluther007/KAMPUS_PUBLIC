const mongoose = require('mongoose');

const lifestyleSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true,
    },
});

const Lifestyle = mongoose.model('lifestyle',lifestyleSchema);
module.exports = Lifestyle