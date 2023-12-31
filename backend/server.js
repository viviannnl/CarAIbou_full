const path = require('path')
const express = require('express')
//const { use } = require('./routes/userRoutes')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require("cors");

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    cors()
)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/habits', require('./routes/habitsRoutes'))
app.use('/api/goals', require('./routes/goalsRoutes'))


app.listen(port, () => console.log(`Server started on port ${port}`))