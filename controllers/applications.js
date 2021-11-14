const Applications = require('../models/Applications');

const listApplication = (req, res) => {
  Applications.find()
    .then((application) => res.status(200).json(application))
    .catch((error) => res.status(400).json(error));
};

const createApplication = (req, res) => {
  const application = new Applications({
    positions: req.body.positions,
    postulants: req.body.postulants,
    interview: req.body.interview,
    result: req.body.result,
  });

  // eslint-disable-next-line no-shadow
  application.save((error, application) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(application);
  });
};

const deleteApplication = (req, res) => {
  Applications.findOneAndDelete(req.params.id, (error) => {
    if (error) {
      return res.status(400).json(`Id ${req.params.id} not found`);
    }
    return res.status(201).json(`Id ${req.params.id} was remove successfully`);
  });
};

module.exports = {
  createApplication,
  deleteApplication,
  listApplication,
};
