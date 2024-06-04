const express = require('express')
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews-controller')
const { validateMongoId } = require('../middlewares/validateMongoId')
const router = express.Router()

// Add a new review.
router.post('/', createReview)

// Get a list with all reviews.
router.get('/', getReviews)

// Get details for a specific review.
router.get('/:id', validateMongoId, getReview)

// Update a specific review.
router.put('/:id', validateMongoId, updateReview)

// Delete a specific review.
router.delete('/:id', validateMongoId, deleteReview)

module.exports = router
