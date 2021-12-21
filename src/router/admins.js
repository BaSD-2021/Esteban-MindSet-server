const express = require('express');
const controller = require('../controllers/admins');
const validations = require('../validations/admins');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  createAdmin,
  getAdmins,
  deleteAdmin,
  updateAdmin,
} = controller;

router.post('/', authMiddleware, validations.required, createAdmin);
router.put('/:id', authMiddleware, validations.validateUpdatedAdmin, updateAdmin);
router.delete('/:id', authMiddleware, validations.validateIdFormat, deleteAdmin);
router.get('/', authMiddleware, getAdmins);

module.exports = router;
