const validateRequiredProfile = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send('name required');
  }
  return next();
};

const validateIdFormat = (req, res, next) => {
  console.log(req.params.id.length);
  if (req.params.id.length !== 24) {
    return res.status(400).send('incorrect id format');
  }
  return next();
};

module.exports = {
  validateRequiredProfile,
  validateIdFormat,
};
