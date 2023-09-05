const asyncHandler = require('express-async-handler')
const Goals = require('../models/goalsModel')

// Set goals for a user
const setGoals = asyncHandler(async (req, res) => {
    //res.status(200).json({message: 'Set my transport habits'})

    const {car_goal, carpool_goal, public_goal, walk_goal} = req.body
    
    if (!car_goal || ! carpool_goal || !public_goal || !walk_goal) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    const goals = await Goals.create({
        user: req.user.id,
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

//Get the goals of user
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.find({user: req.user.id})

    res.status(200).json(goals)
})

module.exports = { setGoals, getGoals }