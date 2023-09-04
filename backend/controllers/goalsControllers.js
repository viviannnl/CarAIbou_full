const asyncHandler = require('express-async-handler')
const Goals = require('../models/goalsModel')

// Register a new user
const setGoals = asyncHandler(async (req, res) => {
    //res.status(200).json({message: 'Set my transport habits'})

    const {car_goal, carpool_goal, public_goal, walk_goal} = req.body
    
    if (!car_goal || ! carpool_goal || !public_goal || !walk_goal) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    const goals = await Goals.create({
        car_goal,
        carpool_goal,
        public_goal,
        walk_goal
    })

    if (!goals) {
        res.status(400)
        throw new Error('Set goals failed')
    }

    res.status(200).json(goals)
})

module.exports = {setGoals}