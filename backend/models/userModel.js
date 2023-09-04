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
    /*
    num_car: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_carpool: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_publlic_transport: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_walk: {
        type: Number,
        require: [true, 'Type your answer here']
    },

    num_car_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_carpool_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_publlic_transport_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    },
    num_walk_goal: {
        type: Number,
        require: [true, 'Type your answer here']
    }
    */
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)