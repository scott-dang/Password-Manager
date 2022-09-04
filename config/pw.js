const bcrypt = require('bcrypt')

module.exports = {
    validPassword: async function(password, hash) {
        return await bcrypt.compare(password, hash)
    },

    genPassword: async function(password) {
        try {
            let salt = await bcrypt.genSalt()
            let hashedPassword = await bcrypt.hash(password, salt)
            return {
                salt: salt,
                hash: hashedPassword
            }

        } catch (err) {
            console.log(err)
        }
    }
}