const { ObjectId } = require('mongoose').Types;

const validateRequiredProfile = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'name required' });
  } if (typeof req.body.name !== 'string') {
    return res.status(400).send({ message: 'invalid type' });
  }
  return next();
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: 'Profile id is not valid' });
  }
  return next();
};

module.exports = {
  validateRequiredProfile,
  validateIdFormat,
};
