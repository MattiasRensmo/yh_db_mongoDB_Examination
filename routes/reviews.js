const express = require('express')
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews-controller')
const router = express.Router()

// POST /reviews: Lägg till en ny recension.
router.post('/', createReview)

// GET /reviews: Hämta en lista med alla recensioner.
router.get('/', getReviews)

// GET /reviews/:id: Hämta detaljer för en specifik recension.
router.get('/:id', getReview)

// PUT /reviews/:id: Uppdatera en specifik recension.
router.put('/:id', updateReview)

// DELETE /reviews/:id: Ta bort en specifik recension.
router.delete('/:id', deleteReview)

module.exports = router
