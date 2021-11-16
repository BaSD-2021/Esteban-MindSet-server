const express = require('express');
const controller = require('../controllers/applications');
const validation = require('../validations/applications');

const router = express.Router();

const {
  createApplication,
  deleteApplication,
  listApplication,
} = controller;

const {
  requireValidation,
  validateApplicantFormat,
} = validation;

router.post('/', requireValidation, validateApplicantFormat, createApplication);
router.delete('/:id', deleteApplication);
router.get('/', listApplication);

module.exports = router;
