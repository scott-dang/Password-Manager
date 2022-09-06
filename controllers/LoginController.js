const passport = require('passport')
const passwordTools = require('../config/pw')
const connection = require('../config/db')
const User = connection.models.User

module.exports = {

    get : (req,res) => {
        if (!req.isAuthenticated()) {
            res.render('login')        
        } else {
            res.redirect('/')
        }
    },

    post : (req, res) => {
        res.render('/')
    }

}
