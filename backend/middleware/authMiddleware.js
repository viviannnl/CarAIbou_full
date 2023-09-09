const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // check if authorized
    //console.log('here')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            
            // get the token from header
            token = req.headers.authorization.split(' ')[1] // format: bearer xxxx(token)

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // this is the id that we have encoded in generateToken method
            
            // attach the user to the request
            req.user = await User.findById(decoded.id)
            
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }   
    }

    if (!token) {
        res.status(401)
        throw new Error('No token')
    }
}) 


module.exports = { protect }