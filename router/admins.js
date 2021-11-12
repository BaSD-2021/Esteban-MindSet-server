const express = require('express')
const controller = require('../controllers/admins')

const router = express.Router()
const {
  getAdmins,
	updateAdmin
} = controller

router.use(express.json)

router.get('/', getAdmins)
router.put('/', updateAdmin)

module.exports = router