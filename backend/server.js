const path = require('path')
const express = require('express')
//const { use } = require('./routes/userRoutes')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/habits', require('./routes/habitsRoutes'))
app.use('/api/goals', require('./routes/goalsRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}

app.listen(port, () => console.log(`Server started on port ${port}`))