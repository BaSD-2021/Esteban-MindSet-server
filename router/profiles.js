const express = require('express')
const controller = require('../controllers/profiles')

const router = express.Router()

const {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles
} = controller

router.post('/', createProfile)
router.put('/', updateProfile)
router.delete('/', deleteProfile)
router.get('/', listProfiles)

module.exports = router