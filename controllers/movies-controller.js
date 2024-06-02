const Movie = require('../models/Movie')

exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body)
    const dbMovie = await movie.save()
    return res.json(dbMovie)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.getMovies = async (req, res) => {
  try {
    const dbMovies = await Movie.find()
    return res.json(dbMovies)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.getMovieById = async (req, res) => {
  try {
    const dbMovie = await Movie.findById(req.params.id)
    return res.json(dbMovie)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.updateMovie = async (req, res) => {
  try {
    const dbMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    return res.json(dbMovie)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found.' })
    }
    console.log(deleted)
    return res.send(`Movie '${deleted.title}' deleted.`)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
