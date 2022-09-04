const passport = require('passport')
const connection = require('./db')
const LocalStrategy = require('passport-local').Strategy
const validPassword = require('./pw').validPassword
const User = require('../models/User')

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
}


// done (*if there was an error*, *success/fail*)
const verifyCallback = async (username, password, done) => {

    await User.findOne({ username: username }).then((user) => {
        if (!user) { return done(null, false) }

        
        validPassword(password, user.hash).then(result => {
            const isValid = result

            console.log('VALID LOGIN? ' + isValid)
            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }).catch((err) => {
        done(err)
    })
} 
const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})

module.exports = passport