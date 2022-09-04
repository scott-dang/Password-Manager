require('dotenv').config

const mongoose = require('mongoose')

const connection = mongoose.createConnection(
    process.env.DATABASE_URL, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
)
connection.on('error', error => {
    console.error(error)
})
connection.on('open', () => {
    console.log('Connected to Mongoose')
})

module.exports = connection