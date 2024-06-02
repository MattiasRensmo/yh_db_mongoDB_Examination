const express = require('express')
const router = express.Router()
const { register } = require('../controllers/user-controller')

//POST /register: Registrera en ny användare.
router.post('/', register)

module.exports = router
