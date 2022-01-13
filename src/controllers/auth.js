const Postulants = require('../models/Postulants');
const Psychologists = require('../models/Psychologists');
const Admins = require('../models/Admins');

const getMe = async (req, res) => {
  try {
    const postulant = await Postulants.findOne({ firebaseUid: req.firebaseUid });
    if (postulant) {
      return res.status(201).json({
        message: 'Postulant found',
        data: postulant,
      });
    }

    const psychologist = await Psychologists.findOne({ firebaseUid: req.firebaseUid });
    if (psychologist) {
      return res.status(201).json({
        message: 'Psychologist created',
        data: psychologist,
      });
    }

    const admin = await Admins.findOne({ firebaseUid: req.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin created',
        data: admin,
      });
    }

    return res.status(204).json({
      message: 'User not found',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  getMe,
};
