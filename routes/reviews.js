const express = require('express')
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews-controller')
const router = express.Router()

// Add a new review.
router.post('/', createReview)

// Get a list with all reviews.
router.get('/', getReviews)

// Get details for a specific review.
router.get('/:id', getReview)

// Update a specific review.
router.put('/:id', updateReview)

// Delete a specific review.
router.delete('/:id', deleteReview)

module.exports = router
