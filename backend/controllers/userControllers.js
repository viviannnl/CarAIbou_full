const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    //res.status(200).json({message: `Register a new user: ${name}.`})
    const {name, email, password, location} = req.body

    if (!name || !email || !password || !location) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // save the user to the database
    const user = await User.create({
        name,
        email,
        password: hash,
        location
    })

    if (!user) {
        res.status(400)
        throw new Error('Register user failed')
    }

    res.status(200).json({
        name,
        email,
        location,
        token: generateToken(user._id)
    })
    
})

// User login
const loginUser = asyncHandler(async (req, res) => {
    //res.status(200).json({message: 'User Login.'})

    const {email, password} = req.body

    // look for the user
    const user = await User.findOne({email}) // return null if not found
    if (!user) {
        res.status(404)
        throw new Error('User does not exists')
    }
        
    // verify the password
    real_password = user.password
    const verified = bcrypt.compareSync(password, real_password)

    if (! verified) {
        res.status(400)
        throw new Error('Wrong password')
    }

    res.status(200).json({
        name: user.name,
        email,
        location: user.lacation,
        token: generateToken(user._id)
    })
})

// Display user info
const getMe = asyncHandler(async (req, res) => {
    //res.status(200).json({message: 'Display user info.'})

    const user = await User.findById(req.user.id)

    res.status(200).json(user)

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}