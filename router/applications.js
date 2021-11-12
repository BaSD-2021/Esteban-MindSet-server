const express = require('express')
const controller = require('../controllers/applications')

const router = express.Router()

const {
  createApplication,
  deleteApplication,
  listApplication,
} = controller

router.post('/', createApplication)
router.delete('/', deleteApplication)
router.get('/', listApplication)

module.exports = router