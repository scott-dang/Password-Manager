const bcrypt = require('bcrypt')
const User = require('../models/User')
const { genPassword } = require("../config/pw")


module.exports = {
    get : (req,res) => {
        if (!req.isAuthenticated()) {
            const failureReasoning = ''
            res.render('signup', { failureReasoning }) 
        } else {
            res.redirect('/')
        }
    },

    post : async (req,res) => {

        const result = await User.findOne({username: req.body.username})

        if (result == null) {
            console.log('pw: ' + req.body.password)
            const hashedPassword = await genPassword(req.body.password)
            const newUser = new User({
                username: req.body.username,
                hash: hashedPassword.hash,
                salt: hashedPassword.salt,
            })

            newUser.save().then(user => {
                console.log('REGISTERED: ' + user)
            })
            res.redirect('/login')
        }
        else { 
            const failureReasoning = 'Please choose a different username'
            res.render('signup', {failureReasoning}) 
        }
        
    }
}