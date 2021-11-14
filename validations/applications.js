const requireValidation = (req, res, next) => {
  if (!req.body.positions) {
    return res.status(400).send('Id position is required');
  }
  if (!req.body.postulants) {
    return res.status(400).send('Id postulant is required');
  }
  if (!req.body.result) {
    return res.status(400).send('Result is required');
  }
  return next();
};

module.exports = {
  requireValidation,
};
