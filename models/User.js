const mongoose = require('mongoose')
const connection = require('../config/db')

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
})

const User = connection.model('User', userSchema)

module.exports = User