const User = require('../models/User')
const decrypt = require('./GeneratePasswordsController').decrypt

module.exports = {

    
    get: async (req,res) => {
        
        const loggedIn = req.isAuthenticated()

        if (loggedIn) {
            try {
                const user = await User.findById(req.user.id)
                console.log(req.query.servicename)
                const encryptedPassword = user.passwords.get(req.query.servicename)[1]
                console.log('pw: ' + user.passwords.get(req.query.servicename))
                const decryptedPassword = decrypt(encryptedPassword, req.query.secretkey)
                const message = 'The password for ' + req.query.servicename + ' is \'' + decryptedPassword + '\''
                res.render('message', { message })
            } catch (err) {
                const message = err
                res.render('message', { message } )
            }
        } else {
            res.render('login')
        }
    },

    post: async (req,res) => {
        const loggedIn = req.isAuthenticated()

        if (loggedIn) {
            const user = await User.findById(req.user.id)
            user.passwords.delete(req.body.servicename)
            user.save()
            res.redirect('/')
        } else {
            res.render('login')
        }
    }

}