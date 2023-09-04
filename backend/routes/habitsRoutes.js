const express = require('express')
const router = express.Router()
const { setHabits } = require('../controllers/habitsControllers')

router.post('/', setHabits)

module.exports = router
