const required = (req, res, next) => {
  if (!req.body.name || typeof (req.body.name) !== 'string') {
    return res.status(400).json({ message: 'You must complete the Name' });
  }
  if (typeof (req.body.phone) !== 'number') {
    return res.status(400).json({ message: 'You must complete the phone number, make sure you digits numbers' });
  }
  if (!req.body.location.country
      || !req.body.location.state
      || !req.body.location.city
      || !req.body.location.address) {
    return res.status(400).send({ message: 'You must complete all the location' });
  }
  return next();
};

module.exports = {
  required,
};
