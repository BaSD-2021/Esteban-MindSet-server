const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validations/auth');

const router = express.Router();

const {
  register,
  login,
} = controller;

router.post('/register', validations.required, register);
router.post('/login', validations.required, login);

module.exports = router;
