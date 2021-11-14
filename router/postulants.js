const express = require('express');
const controller = require('../controllers/postulants');

const router = express.Router();

const {
  createPostulant,
  updatePostulants,
  deletePostulant,
  listPostulants,
} = controller;

router.post('/', createPostulant);
router.put('/:id', updatePostulants);
router.delete('/:id', deletePostulant);
router.get('/', listPostulants);

module.exports = router;
