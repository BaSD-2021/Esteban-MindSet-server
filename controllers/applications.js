const Applications = require('../models/Applications');

const listApplication = (req, res) => {
  Applications.find(req.query)
    .then((application) => res.status(200).json({
      message: 'List of clients:',
      data: application,
    }))
    .catch((error) => res.status(400).json({ message: error }));
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
      return res.status(400).json({ message: error });
    }
    return res.status(201).json(app);
  });
};

const deleteApplication = (req, res) => {
  Applications.findByIdAndDelete(req.params.id, (error, chosenApplication) => {
    if (!chosenApplication) {
      return res.status(404).json({ message: `Id ${req.params.id} does not exist` });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send();
  });
};

module.exports = {
  createApplication,
  deleteApplication,
  listApplication,
};
