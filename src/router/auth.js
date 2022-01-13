const express = require('express');
const controller = require('../controllers/auth');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  getMe,
} = controller;

router.get('/me', authMiddleware, getMe);

module.exports = router;
