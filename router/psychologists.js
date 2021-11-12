const express = require('express')
const controller = require('../controllers/psychologists')

const router = express.Router()

const {
  getPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist
} = controller

router.post('/', createPsychologist)
router.put('/', updatePsychologist)
router.delete('/', deletePsychologist)
router.get('/', getPsychologists)

module.exports = router