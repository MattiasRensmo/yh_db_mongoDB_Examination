const express = require('express')
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMovieReviews,
  getMoviesWithRating,
} = require('../controllers/movies-controller')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router()

/*
 * Every user can access the routes below.
 */

// Get a list with all movies.
router.get('/', getMovies)

// Get a list with all movies and their average rating.
router.get('/ratings', getMoviesWithRating)

// Get details for a specific movie.
router.get('/:id', getMovieById)

// Get all reviews for a specific movie.
router.get('/:id/reviews', getMovieReviews)

/*
 * Only Admin can access the routes below.
 * Thanks to the isAdmin middleware.
 */

router.use(isAdmin)

// Add a new movie.
router.post('/', addMovie)

// Update a specific movie.
router.put('/:id', updateMovie)

// Delete a specific movie.
router.delete('/:id', deleteMovie)

module.exports = router
