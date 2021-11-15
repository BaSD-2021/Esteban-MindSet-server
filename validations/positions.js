const { ObjectId } = require('mongoose').Types;

const required = (req, res, next) => {
  if (!req.body.client || !ObjectId.isValid(req.body.client)) {
    return res.status(400).json({message: 'You must complete a valid id of the client'});
  }
  if (!req.body.professionalProfiles) {
    return res.status(400).json({message: 'You must complete at least one proffesional profile.'});
  }
  if (!req.body.isOpen || (req.body.isOpen !== true && req.body.isOpen !== false)) {
    return res.status(400).send({message: 'You must Indicate if the position is open(true) or close(false)'});
  }
  return next();
};

module.exports = {
  required,
};
