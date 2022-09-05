module.exports = {

    get : (req, res) => {

        let loggedIn = req.isAuthenticated()

        if (loggedIn) {
            res.locals.serviceObj = req.user.passwords
            res.render('index')
        }
        else {
            res.render('login')
        }
    },
}