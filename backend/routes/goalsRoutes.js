const express = require('express')
const router = express.Router()
const { setGoals, getGoals } = require('../controllers/goalsControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setGoals)
router.get('/', protect, getGoals)

module.exports = router