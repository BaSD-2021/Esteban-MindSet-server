const express = require('express');
const validations = require('../validations/sessions');
const controller = require('../controllers/sessions');

const router = express.Router();

const {
  createSession,
  listAllSessions,
  listSession,
  updateSession,
  deleteSession,
} = controller;

router.post('/', validations.validateSessions, createSession);
router.put('/:id', validations.validateIdFormat, validations.validateSessionsUsedAttr, updateSession);
router.delete('/:id', validations.validateIdFormat, deleteSession);
router.get('/', listAllSessions);
router.get('/:id', validations.validateIdFormat, listSession);

module.exports = router;
