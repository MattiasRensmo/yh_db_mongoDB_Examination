const Movie = require('../models/Movie')
const Review = require('../models/Review')

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

exports.getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id }).populate(
      'userId',
      'username'
    )

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: 'Movie not found.' })
    }

    const reviewsResponse = reviews.map((review) => {
      return {
        id: review._id,
        userId: review.userId._id,
        userName: review.userId.username,
        rating: review.rating,
        review: review.review,
        comment: review.comment,
        createdAt: review.createdAt,
      }
    })

    return res.json(reviewsResponse)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

// Return list with all movies and their average rating. Rating: null if none exists.
exports.getMoviesWithRating = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        },
      },
      {
        $project: {
          title: 1,
          director: 1,
          releaseYear: 1,
          genre: 1,
          averageRating: { $avg: '$reviews.rating' },
        },
      },
    ])

    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: 'No movies found.' })
    }

    return res.json(movies)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
