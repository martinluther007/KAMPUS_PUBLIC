const mongoose = require('mongoose');
const Team = require('./teamModel');

const lineupSchema = new mongoose.Schema({
    date:{
        type:String,
        required:[true,'please put in a date']
    },
    team:[
        {
        type:mongoose.Schema.ObjectId,
        ref:Team
    }
]
});

lineupSchema.pre(/^find/,function(next) {
    this.populate({
        path:'team',
    })
    next()
})
const Lineup = mongoose.model('lineup',lineupSchema);


module.exports = Lineup;