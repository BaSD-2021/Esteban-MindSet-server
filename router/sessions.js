const express = require('express')
const controller = require('../controllers/sessions')

const router = express.Router()

const {
  createSession, 
  listSession, 
  updateSession, 
  deleteSession
} = controller

router.post('/', createSession)
router.put('/', updateSession)
router.delete('/', deleteSession)
router.get('/', listSession)

module.exports = router