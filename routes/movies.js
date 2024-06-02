const express = require('express')
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies-controller')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router()

/*
 * Every user can access the routes below.
 */

// GET /movies: Hämta en lista med alla filmer.
router.get('/', getMovies)

// GET /movies/:id: Hämta detaljer för en specifik film.
router.get('/:id', getMovieById)

// GET /movies/:id/reviews: Hämta alla recensioner för en specifik film.
router.get('/:id/reviews', (req, res) => {
  res.send('Hämta alla recensioner för en specifik film.')
})

//GET /movies/ratings: Hämta en lista med alla filmer och deras genomsnittliga betyg.
router.get('/ratings', (req, res) => {
  res.send('Hämta en lista med alla filmer och deras genomsnittliga betyg.')
})

/*
 * Only Admin can access the routes below.
 * Thanks to the isAdmin middleware.
 */

router.use(isAdmin)

// POST /movies: Lägg till en ny film.
router.post('/', addMovie)

// PUT /movies/:id: Uppdatera en specifik film.
router.put('/:id', updateMovie)

// DELETE /movies/:id: Ta bort en specifik film.
router.delete('/:id', deleteMovie)

module.exports = router
