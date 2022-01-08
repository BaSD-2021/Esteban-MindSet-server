const express = require('express');
const controller = require('../controllers/applications');
const validation = require('../validations/applications');

const router = express.Router();

const {
  createApplication,
  deleteApplication,
  listApplication,
  updateApplication,
} = controller;

const {
  requireValidation,
  validateApplicantFormat,
} = validation;

router.post('/', requireValidation, validateApplicantFormat, createApplication);
router.delete('/:id', deleteApplication);
router.get('/', listApplication);
router.put('/:id', validateApplicantFormat, validateApplicantFormat, updateApplication);

module.exports = router;
