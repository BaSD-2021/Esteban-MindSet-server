const Applications = require('../models/Applications');

const requireValidation = (req, res, next) => {
  if (!req.body.positions) {
    return res.status(400).send('Id position is require');
  }
  if (!req.body.postulants) {
    return res.status(400).send('Id postulant is require');
  }
  if (!req.body.result) {
    return res.status(400).send('Result is require');
  }
  return next();
};

const idValidation = (req, res, next) => {
  const paramsId = req.params.id;
  Applications.findById(paramsId, (error) => {
    if (error) {
      return res.status(400).send('Id does not exist');
    }
    return res.status(200);
  });
  next();
};

module.exports = {
  requireValidation,
  idValidation,
};
