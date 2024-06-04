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
const { validateMongoId } = require('../middlewares/validateMongoId')
const router = express.Router()

/*
 * Every user can access the routes below.
 */

// Get a list with all movies.
router.get('/', getMovies)

// Get a list with all movies and their average rating.
router.get('/ratings', getMoviesWithRating)

// Get details for a specific movie.
router.get('/:id', validateMongoId, getMovieById)

// Get all reviews for a specific movie.
router.get('/:id/reviews', validateMongoId, getMovieReviews)

/*
 * Only Admin can access the routes below.
 * Thanks to the isAdmin middleware.
 */

router.use(isAdmin)

// Add a new movie.
router.post('/', addMovie)

// Update a specific movie.
router.put('/:id', validateMongoId, updateMovie)

// Delete a specific movie.
router.delete('/:id', validateMongoId, deleteMovie)

module.exports = router
