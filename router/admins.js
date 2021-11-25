const express = require('express');
const controller = require('../controllers/admins');
const validations = require('../validations/admins');

const router = express.Router();

const {
  createAdmin,
  getAdmins,
  deleteAdmin,
  updateAdmin,
} = controller;

router.post('/', validations.validateUpdatedAdmin, createAdmin);
router.put('/:id', validations.validateUpdatedAdmin, updateAdmin);
router.delete('/:id', validations.validateIdFormat, deleteAdmin);
router.get('/', getAdmins);

module.exports = router;
