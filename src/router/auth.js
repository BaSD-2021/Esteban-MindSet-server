const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validations/auth');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  register,
  login,
  logout,
} = controller;

router.post('/register', validations.required, register);
router.post('/login', validations.required, login);
router.post('/logout', authMiddleware, logout);

module.exports = router;
