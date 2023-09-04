const mongoose = require('mongoose')

const goalsSchema = mongoose.Schema({
    car_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    carpool_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    public_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    walk_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goals', goalsSchema)