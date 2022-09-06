module.exports = {

    get : (req, res) => {

        let loggedIn = req.isAuthenticated()

        if (loggedIn) {
            const newMap = new Map()
            req.user.passwords.forEach( (serviceObj, servicename) => {
                newMap.set(servicename, serviceObj[0])
            })
            res.locals.serviceObj = newMap
            
            res.render('index')
        }
        else {
            res.render('login')
        }
    },
}