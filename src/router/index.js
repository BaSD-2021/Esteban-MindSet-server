const express = require('express');

const router = express.Router();
const admins = require('./admins');
const applications = require('./applications');
const clients = require('./clients');
const interviews = require('./interviews');
const positions = require('./positions');
const profiles = require('./profiles');
const psychologists = require('./psychologists');
const sessions = require('./sessions');
const postulants = require('./postulants');
const auth = require('./auth');

router.use('/admins', admins);
router.use('/applications', applications);
router.use('/clients', clients);
router.use('/interviews', interviews);
router.use('/positions', positions);
router.use('/profiles', profiles);
router.use('/psychologists', psychologists);
router.use('/sessions', sessions);
router.use('/postulants', postulants);
router.use('/auth', auth);

module.exports = router;
