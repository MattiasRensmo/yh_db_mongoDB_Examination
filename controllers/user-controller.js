const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Hantera routen /register
exports.register = async (req, res) => {
  try {
    const password = req.body.password
    //We need to check password length here, before we hash it.
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long.' })
    const passwordHashed = await bcrypt.hash(password, 10)

    //Mongo will validate the rest of the data.
    const user = new User({ ...req.body, password: passwordHashed })
    const { username, email, role, _id } = await user.save()
    return res.status(201).json({ username, email, role, id: _id })
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: 'Username or email already exists.' })
    }
    return res.status(400).json({ error: error.message })
  }
}

//Hantera routen /login
exports.login = async (req, res) => {
  const { username, password, email } = req.body
  if (!username && !email) {
    return res.status(400).json({ error: 'Username or email is required.' })
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required.' })
  }

  let dbUser
  if (username) {
    dbUser = await User.findOne({ username })
  } else if (email) {
    dbUser = await User.findOne({ email })
  }
  if (!dbUser) {
    return res.status(400).json({ error: 'User not found.' })
  }
  if (await bcrypt.compare(password, dbUser.password)) {
    const token = jwt.sign(
      { username: dbUser.username, role: dbUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    //Set the JWT token in a cookie that expires in one hour.
    return res.cookie('token', token, { maxAge: 3600000 }).send('Logged in.')
  }
  return res
    .status(401)
    .cookie('token', '', { maxAge: 0 }) //Clear cookie if login fails.
    .json({ error: 'Wrong password.' })
}
