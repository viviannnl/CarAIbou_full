const express = require('express')
const router = express.Router()
const { setGoals } = require('../controllers/goalsControllers')

router.post('/', setGoals)

module.exports = router