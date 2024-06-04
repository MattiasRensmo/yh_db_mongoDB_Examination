const express = require('express')
const router = express.Router()
const { register } = require('../controllers/user-controller')

//Create a new user.
router.post('/', register)

module.exports = router
