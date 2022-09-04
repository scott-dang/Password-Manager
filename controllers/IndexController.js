module.exports = {

    get : (req, res) => {

        let loggedIn = req.isAuthenticated()

        if (loggedIn) {
            const username = req.user.username
            res.render('index', { username })
            
        }
        else {
            res.render('login')
        }
    },
}