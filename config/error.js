module.exports = (err, req, res, next) => {
    if (err) {
        res.send('There was an error.')
    } else {
        next()
    }
}