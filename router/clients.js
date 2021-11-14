const express = require('express');
const controller = require('../controllers/clients');
const clientValidations = require('../validations/clients');

const router = express.Router();

const {
  createClient,
  updateClient,
  deleteClient,
  listClients,
} = controller;

router.post('/', clientValidations.required, createClient);
router.put('/:id', clientValidations.required, updateClient);
router.delete('/:id', clientValidations.deleteValidation, deleteClient);
router.get('/', listClients);

module.exports = router;
