const express = require('express');
const controller = require('../controllers/positions');
const router = express.Router();

const {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions,
} = controller;

router.get('/', listPositions);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

module.exports = router;
