const express = require('express');
const controller = require('../controllers/admins');

const router = express.Router();

const {
  getAdmins,
  updateAdmin,
} = controller;

router.get('/', getAdmins);
router.put('/:id', updateAdmin);

module.exports = router;
