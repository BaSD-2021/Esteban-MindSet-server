const express = require('express');
const controller = require('../controllers/psychologists');
const validations = require('../validations/psychologists');

const router = express.Router();

const {
  getPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
} = controller;

router.post('/', validations.validatePsychologists, createPsychologist);
router.put('/:id', validations.validateIdFormat, updatePsychologist);
router.delete('/:id', validations.validateIdFormat, deletePsychologist);
router.get('/', getPsychologists);

module.exports = router;
