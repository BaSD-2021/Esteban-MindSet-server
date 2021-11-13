const express = require('express');
const controller = require('../controllers/interviews');
const validations = require('../validations/interviews');

const router = express.Router();

const {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} = controller;

const {
  validateInterview,
  validateInterviewId,
} = validations;

router.post('/', validateInterview, createInterview);
router.put('/:id', validateInterviewId, updateInterview);
router.delete('/:id', validateInterviewId, deleteInterview);
router.get('/', listInterviews);

module.exports = router;
