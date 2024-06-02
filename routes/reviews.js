const express = require('express')
const router = express.Router()

// POST /reviews: Lägg till en ny recension.
router.post('/', (req, res) => {
  res.send('Lägg till en ny recension')
})
// GET /reviews: Hämta en lista med alla recensioner.
router.get('/', (req, res) => {
  res.send('Hämta en lista med alla recensioner')
})
// GET /reviews/:id: Hämta detaljer för en specifik recension.
router.get('/:id', (req, res) => {
  res.send('Hämta detaljer för en specifik recension')
})
// PUT /reviews/:id: Uppdatera en specifik recension.
router.put('/:id', (req, res) => {
  res.send('Uppdatera en specifik recension')
})
// DELETE /reviews/:id: Ta bort en specifik recension.
router.delete('/:id', (req, res) => {
  res.send('Ta bort en specifik recension')
})

module.exports = router
