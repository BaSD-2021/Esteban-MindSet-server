const express = require('express');
const controller = require('../controllers/profiles');
const validations = require('../validations/profiles');

const router = express.Router();

const {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
} = controller;

const {
  validateRequiredProfile,
  validateIdFormat,
} = validations;

router.get('/', listProfiles);
router.post('/', validateRequiredProfile, createProfile);
router.put('/:id', validateIdFormat, updateProfile);
router.delete('/:id', validateIdFormat, deleteProfile);

module.exports = router;
