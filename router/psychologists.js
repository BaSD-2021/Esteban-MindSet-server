const express = require('express');
const controller = require('../controllers/psychologists');
const validations = require('../validations/psychologists');

const router = express.Router();

const {
  listPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
} = controller;

router.post('/', createPsychologist);
router.put('/:id', validations.validateIdFormat, validations.validatePsychologistsUsedAttr, updatePsychologist);
router.delete('/:id', validations.validateIdFormat, deletePsychologist);
router.get('/', listPsychologists);

module.exports = router;
