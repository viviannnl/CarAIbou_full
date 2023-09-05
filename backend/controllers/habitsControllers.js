const asyncHandler = require('express-async-handler')
const Habits = require('../models/habitsModel')

// Set habits for a user
const setHabits = asyncHandler(async (req, res) => {
    //res.status(200).json({message: 'Set my transport habits'})

    const {car, carpool, public, walk} = req.body
    
    if (!car || ! carpool || !public || !walk) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    const habits = await Habits.create({
        car,
        carpool,
        public,
        walk
    })

    if (!habits) {
        res.status(400)
        throw new Error('Set habits failed')
    }

    res.status(200).json(habits)
})

module.exports = {setHabits}