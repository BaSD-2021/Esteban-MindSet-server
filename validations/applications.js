const { ObjectId } = require('mongoose').Types;

const requireValidation = (req, res, next) => {
  if (!req.body.positions) {
    return res.status(400).send({ message: 'Id position is required' });
  }
  if (!req.body.postulants) {
    return res.status(400).send({ message: 'Id postulant is required' });
  }
  if (!req.body.result) {
    return res.status(400).send({ message: 'Result is required' });
  }
  return next();
};

const validateApplicantFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.body.positions)) {
    return res.status(400).send({ message: 'Invalid Id Positions' });
  }
  if (!ObjectId.isValid(req.body.postulants)) {
    return res.status(400).send({ message: 'Invalid Id Postulants' });
  }
  if (!ObjectId.isValid(req.body.interview)) {
    return res.status(400).send({ message: 'Invalid Id Interview' });
  }
  if (typeof req.body.result !== 'string' || !req.body.result || !req.body.result === '') {
    return res.status(400).send({ message: 'Invalid result' });
  }
  return next();
};

module.exports = {
  requireValidation,
  validateApplicantFormat,
};
