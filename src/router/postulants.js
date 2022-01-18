const express = require('express');
const controller = require('../controllers/postulants');
const validations = require('../validations/postulants');

const router = express.Router();

const {
  createPostulant,
  updatePostulants,
  deletePostulant,
  listPostulants,
  setProfilePostulants,
} = controller;

const {
  validatePostulant,
  validatePostulantId,
  validateUpdatedPostulant,
} = validations;

router.post('/', validatePostulant, createPostulant);
router.put('/profile/:id', validatePostulantId, setProfilePostulants);
router.put('/:id', validatePostulantId, validateUpdatedPostulant, updatePostulants);
router.delete('/:id', validatePostulantId, deletePostulant);
router.get('/', listPostulants);

module.exports = router;
