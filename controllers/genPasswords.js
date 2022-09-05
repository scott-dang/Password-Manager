const User = require('../models/User')
const crypto = require('crypto')

const algorithm = 'aes-256-ctr';
const iv = 'anbjfaskl.alejfa'

const encrypt = (password, key) => {

    const cipher = crypto.createCipheriv(algorithm, key, iv)
    const encryptedPassword = ( (cipher.update(password, "utf-8", "hex")) + cipher.final("hex") )
    return encryptedPassword
}

const decrypt = (encryptedPassword, key) => {

    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    const decryptedPassword = (decipher.update(encryptedPassword, 'hex', 'utf-8') + decipher.final('utf8'))
    return decryptedPassword
}

module.exports = {
    
    encrypt,
    
    decrypt,

    post: async (req,res) => {
        if (req.isAuthenticated()) {
            const user = await User.findById(req.user.id)

            const servicename = req.body.newservice
            const secretkey = req.body.secretkey

            if (user.passwords.has(servicename)) {

                const message = 'That service already exists.'
                res.render('message', { message })
            } else {

                user.passwords.set(servicename, encrypt(req.body.newpassword, secretkey))

                user.save()

                res.redirect('/') 
            }
        } else {
            res.redirect('/login')
        }
    }

}