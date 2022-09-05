const bcrypt = require('bcrypt')
const User = require('../models/User')
const { genPassword } = require("../config/pw")


module.exports = {
    get : (req,res) => {
        if (!req.isAuthenticated()) {
            res.render('signup') 
        } else {
            const message = 'You are already logged in.'
            res.render('message', { message })
        }
    },

    post : async (req,res) => {

        const result = await User.findOne({username: req.body.username})

        if (result == null) {
            console.log('pw: ' + req.body.password)
            const hashedPassword = await genPassword(req.body.password)
            const newUser = new User({
                username: req.body.username,
                hash: hashedPassword.hash
            })

            newUser.save().then(user => {
                console.log('REGISTERED: ' + user)
            })
            res.redirect('/login')
        }
        else { 
            const message = 'Please choose a different username'
            res.render('message', { message }) 
        }
        
    }
}