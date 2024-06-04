const mongoose = require('mongoose')

//We check if the provided ID is a valid MongoDB ID. We do not check if it exists in the database.
exports.validateMongoId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid ID')
  }
  next()
}
