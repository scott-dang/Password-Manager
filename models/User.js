const mongoose = require('mongoose')
const connection = require('../config/db')

const userSchema = new mongoose.Schema({

    username: { 
        type: String,
        required: true 
    },
    hash: { 
        type: String,
        required: true
    },

    passwords: { 
        type: Map,
        default: () => { return map = new Map() },
        required: true
    },

    admin: Boolean
})

const User = connection.model('User', userSchema)

module.exports = User