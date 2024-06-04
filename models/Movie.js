const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  director: {
    type: String,
    required: [true, 'Director is required.'],
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required.'],
    min: [
      1888,
      'The first movie ever was made in 1888. You cant go earlier than that.',
    ],
    max: [new Date().getFullYear(), "Release year can't be in the future."],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required.'],
  },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
