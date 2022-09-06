const express = require('express')
const router = express.Router()
const controller = require('../controllers/genPasswords')

router.post('/', controller.post)
router.get('/', controller.get)

module.exports = router