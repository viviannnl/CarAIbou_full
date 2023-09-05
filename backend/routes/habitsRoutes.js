const express = require('express')
const router = express.Router()
const { setHabits, getHabits } = require('../controllers/habitsControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setHabits)
router.get('/', protect, getHabits)

module.exports = router
