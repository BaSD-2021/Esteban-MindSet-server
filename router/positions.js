const express = require('express');
const controller = require('../controllers/positions');
const router = express.Router();
const positionsValidations = require('../validations/positions');


const {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions,
} = controller;

router.get('/', listPositions);
router.post('/', positionsValidations.required, createPosition);
router.put('/:id', positionsValidations.required, updatePosition);
router.delete('/:id', deletePosition);

module.exports = router;
