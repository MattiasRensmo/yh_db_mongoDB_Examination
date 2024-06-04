exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({ error: 'You are not admin.' })
  }
  next()
}
