exports.isAdmin = (req, res, next) => {
  console.log('Checking if user is admin') //TODO: Remove this line
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({ error: 'Not authorized.' })
  }
  next()
}
