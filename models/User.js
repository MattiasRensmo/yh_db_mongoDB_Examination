const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true, // Unique is not a validation - so we need to handle this error manually.
    minLength: [3, 'Username must be at least 3 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (mail) => {
        // Regex test for a valid email address.
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)
      },
      message: (props) => `${props.value} is not an valid email adress `,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minLength: [6, 'Username must be at least 6 characters long.'],
  },
  role: {
    type: String,
    required: [true, 'Role is required.'],
    enum: {
      values: ['admin', 'user'],
      message: `Role must be 'admin' or 'user' - '{VALUE}' is neither`,
    },
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
