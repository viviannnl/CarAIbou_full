const mongoose = require('mongoose')

const habitsSchema = mongoose.Schema({
    car: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    carpool: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    public: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    walk: {
        type: Number,
        require: [true, 'Type your answer here']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Habits', habitsSchema)

