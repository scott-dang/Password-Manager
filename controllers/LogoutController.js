module.exports = {
    get: (req,res, next) => {
        req.logOut(err => {
            if (err) { next(err) }
            else { res.redirect('/') }
        })
    }
}