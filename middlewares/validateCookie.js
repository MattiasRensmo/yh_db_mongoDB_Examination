const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.validateCookie = (req, res, next) => {
  // A function to use if the user fails any of the checks.
  const notAuthorized = () => res.status(401).json({ error: 'Not authorized.' })

  if (!req.cookies) {
    return notAuthorized()
  }
  const token = req.cookies.token
  if (!token) {
    return notAuthorized()
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return notAuthorized()
    }
    req.user = decoded
    next()
  })
}
