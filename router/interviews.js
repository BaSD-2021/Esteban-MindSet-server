const express = require('express');
const controller = require('../controllers/interviews');

const router = express.Router();

const {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} = controller;

router.post('/', createInterview);
router.put('/', updateInterview);
router.delete('/', deleteInterview);
router.get('/', listInterviews);

module.exports = router;
