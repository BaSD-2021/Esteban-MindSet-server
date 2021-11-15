const express = require('express');
const validations = require('../validations/sessions');
const controller = require('../controllers/sessions');

const router = express.Router();

const {
  createSession,
  listSessions,
  updateSession,
  deleteSession,
} = controller;

router.post('/', validations.validateSessions, createSession);
router.put('/:id', validations.validateSessionsUsedAttr, updateSession);
router.delete('/:id', deleteSession);
router.get('/', listSessions);

module.exports = router;
