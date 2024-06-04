//Reviews controller
const mongoose = require('mongoose')
const Review = require('../models/Review')
const User = require('../models/User')
const Movie = require('../models/Movie')

exports.createReview = async (req, res) => {
  // We do not need to check if the user exists, because the user is already authenticated
  try {
    const userId = req.user.id
    const { movieId, rating, comment } = req.body

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).send('Invalid movie ID')
    }

    const movieExists = await Movie.exists({ _id: movieId })
    if (!movieExists) {
      return res.status(404).send('Movie not found')
    }

    const review = new Review({ userId, movieId, rating, comment })
    await review.save()

    res.status(201).json(review)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'username')
      .populate('movieId', 'title')
      .lean()
      .exec()

    const reviewsWithNames = reviews.map((review) => ({
      ...review,
      movieId: review.movieId._id,
      movieTitle: review.movieId.title,
      userId: review.userId._id,
      userName: review.userId.username,
    }))

    res.send(reviewsWithNames)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

exports.getReview = async (req, res) => {
  try {
    const movieId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).send('Invalid movie ID')
    }

    const review = await Review.findById(req.params.id)
      .populate('userId', 'username')
      .populate('movieId', 'title')
      .lean()
      .exec()

    if (!review) {
      return res.status(404).send('Review not found')
    }

    const reviewWithNames = {
      ...review,
      movieId: review.movieId._id,
      movieTitle: review.movieId.title,
      userId: review.userId._id,
      userName: review.userId.username,
    }

    res.send(reviewWithNames)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.id
    const reviewId = req.params.id
    const { rating, comment } = req.body

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).send('Invalid review ID')
    }

    // Get the review and check if we found something
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).send('Review not found')
    }

    //Only the user who created the review or an admin can update it
    if (userId !== review.userId.toString() && req.user.role !== 'admin') {
      return res.status(403).send('You are not allowed to update this review')
    }

    //Update the fields provided
    if (rating) review.rating = rating
    if (comment) review.comment = comment

    await review.save()

    res.send(review)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.id
    const reviewId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).send('Invalid review ID')
    }

    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).send('Review not found')
    }

    //Only the user who created the review or an admin can delete it
    if (userId !== review.userId.toString() && req.user.role !== 'admin') {
      return res.status(403).send('You are not allowed to delete this review')
    }

    await Review.findByIdAndDelete(reviewId)

    res.send('Review deleted')
  } catch (error) {
    res.status(400).send(error.message)
  }
}
