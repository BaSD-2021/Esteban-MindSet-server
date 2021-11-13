const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send('You must complete the Name');
  }
  if (!req.body.phone) {
    return res.status(400).send('You must complete the phone number');
  }
  if (!req.body.location.country
        || !req.body.location.state
        || !req.body.location.city
        || !req.body.location.address) {
    return res.status(400).send('You must complete all the location');
  }
  return next();
};

module.exports = {
  required,
};
