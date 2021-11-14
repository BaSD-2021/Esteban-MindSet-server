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

  application.save((error, app) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(app);
  });
};

const deleteApplication = (req, res) => {
  Applications.findByIdAndDelete(req.params.id, (error, chosenApplication) => {
    if (!chosenApplication) {
      return res.status(404).json(`Id ${req.params.id} not found`);
    } if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send(`Id ${req.params.id} was remove successfully`);
  });
};

module.exports = {
  createApplication,
  deleteApplication,
  listApplication,
};
