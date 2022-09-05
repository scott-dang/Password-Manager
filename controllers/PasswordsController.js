const User = require('../models/User')
const decrypt = require('../controllers/genPasswords').decrypt

module.exports = {

    get: async (req,res) => {
        
        const loggedIn = req.isAuthenticated()

        if (loggedIn) {
            const user = await User.findById(req.user.id)
            const encryptedPassword = user.passwords.get(req.query.servicename)
            const decryptedPassword = decrypt(encryptedPassword, req.query.secretkey)
            const message = 'The password you for ' + req.query.servicename + ' is \'' + decryptedPassword + '\''
            res.render('message', { message })
        } else {
            res.render('login')
        }
    },

    post: async (req,res) => {
        const loggedIn = req.isAuthenticated()

        if (loggedIn) {
            const user = await User.findById(req.user.id)
            console.log(req.body.servicename)
            user.passwords.delete(req.body.servicename)
            user.save()
            res.redirect('/')
        } else {
            res.render('login')
        }
    }

}