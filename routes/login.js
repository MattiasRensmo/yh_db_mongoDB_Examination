const express = require('express')
const router = express.Router()
const { login } = require('../controllers/user-controller')

// Log in for a user.
router.post('/', login)

module.exports = router
