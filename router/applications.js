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
  idValidation,
} = validation;

router.post('/', requireValidation, createApplication);
router.delete('/:id', idValidation, deleteApplication);
router.get('/', listApplication);

module.exports = router;
