const { ObjectId } = require('mongoose').Types;

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ message: errorDescription });
};

const validateUpdatedAdmin = (req, res, next) => {
  const bodyReq = req.body;

  if (bodyReq.name && typeof bodyReq.name !== 'string') {
    return res.status(400).json({
      message: 'Name is wrong or missing',
    });
  }
  if (bodyReq.username && typeof bodyReq.username !== 'string') {
    return res.status(400).json({
      message: 'Username is wrong or missing',
    });
  }
  if (bodyReq.password && typeof bodyReq.password !== 'string') {
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
};
