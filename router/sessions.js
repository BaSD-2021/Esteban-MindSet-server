const express = require('express');
const validations = require('../validations/sessions');
const controller = require('../controllers/sessions');

const router = express.Router();

const {
  createSession,
  listSession,
  updateSession,
  deleteSession,
} = controller;

router.post('/', validations.validateSessions, createSession);
router.put('/', updateSession);
router.delete('/', deleteSession);
router.get('/', listSession);

module.exports = router;
