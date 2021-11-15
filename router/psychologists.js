const express = require('express');
const controller = require('../controllers/psychologists');
const validations = require('../validations/psychologists');

const router = express.Router();

const {
  listPsychologist,
  listAllPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
} = controller;

router.post('/', validations.validatePsychologists, createPsychologist);
router.put('/:id', validations.validateIdFormat, validations.validatePsychologistsUsedAttr, updatePsychologist);
router.delete('/:id', validations.validateIdFormat, deletePsychologist);
router.get('/', listAllPsychologists);
router.get('/:id', validations.validateIdFormat, listPsychologist);

module.exports = router;
