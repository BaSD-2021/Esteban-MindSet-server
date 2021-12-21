const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validations/auth');

const router = express.Router();

const {
  register,
} = controller;

router.post('/register', validations.required, register);

module.exports = router;
