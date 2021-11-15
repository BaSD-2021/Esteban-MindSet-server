const express = require('express');
const controller = require('../controllers/postulants');

const router = express.Router();

const {
  createPostulant,
  updatePostulants,
  deletePostulant,
  getPostulants,
} = controller;

router.post('/', createPostulant);
router.put('/', updatePostulants);
router.delete('/', deletePostulant);
router.get('/', getPostulants);

module.exports = router;