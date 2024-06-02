const express = require('express')
const router = express.Router()
const { login } = require('../controllers/user-controller')

// POST /login: Logga in en användare
router.post('/', login)

module.exports = router
