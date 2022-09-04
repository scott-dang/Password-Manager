const express = require('express')
const passport = require('passport')
const controller = require('../controllers/LoginController')
const router = express.Router()

router.get('/', controller.get)
router.post('/', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }))


module.exports = router