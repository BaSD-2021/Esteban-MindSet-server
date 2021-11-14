const { ObjectId } = require('mongoose').Types;

const validateRequiredProfile = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send('name required');
  }
  return next();
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Profile id is not valid');
  }
  return next();
};

module.exports = {
  validateRequiredProfile,
  validateIdFormat,
};
