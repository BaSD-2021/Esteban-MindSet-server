const express = require('express')
const controller = require('../controllers/positions')

const router = express.Router()

const {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions
} = controller

router.post('/', createPosition)
router.put('/', updatePosition)
router.delete('/', deletePosition)
router.get('/', listPositions)

module.exports = router