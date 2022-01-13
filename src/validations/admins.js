const { ObjectId } = require('mongoose').Types;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ message: errorDescription });
};

const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Name is required' });
  }
  if (!req.body.email || !req.body.email.match(emailRegex)) {
    return res.status(400).json({ message: 'Email is wrong or missing' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'Password is required' });
  }
  return next();
};

const validateUpdatedAdmin = (req, res, next) => {
  if (req.body.name && typeof req.body.name !== 'string') {
    return res.status(400).json({
      message: 'Name is wrong or missing',
    });
  }
  if (!req.body.email || !req.body.email.match(emailRegex)) {
    return res.status(400).json({
      message: 'Email is wrong or missing',
    });
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    return res.status(400).json({
      message: 'Password is wrong or missing',
    });
  }

  return next();
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return errorResHelper(
      `The Admin 'Id' (${req.params.id}) given is wrong or missing`,
      res,
    );
  }
  return next();
};

module.exports = {
  validateUpdatedAdmin,
  validateIdFormat,
  required,
};
