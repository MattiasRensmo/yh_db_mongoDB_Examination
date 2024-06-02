const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const { validateCookie } = require('./middlewares/validateCookie')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL).catch((error) => console.log(error))

app.use(cookieParser())
app.use(express.json())
app.use('/reviews', validateCookie, require('./routes/reviews'))
app.use('/movies', validateCookie, require('./routes/movies'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})
