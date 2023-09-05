const express = require('express')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name']
    },
    email: {
        type: String,
        require: [true, 'Please add an email']
    },
    password: {
        type: String,
        require: [true, 'Please add a password']
    },
    location: {
        type: String,
        require: [true, 'Which state do you live in?']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)