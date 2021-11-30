const Applications = require('../models/Applications');

const listApplication = (req, res) => {
  Applications.find(req.query)
    .populate({
      path: 'positions',
      select: 'jobDescription',
      populate: { path: 'client', model: 'Clients', select: 'name' },
    })
    .populate('postulants', ['firstName', 'lastName'])
    .populate('interview', 'date')
    .then((application) => {
      res.status(200).json({
        message: 'List of Applications',
        data: application,
      });
    })
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
    return res.status(201).json({ message: 'Application Created', data: app });
  });
};

const updateApplication = (req, res) => {
  Applications.findByIdAndUpdate(
    req.params.id,
    {
      positions: req.body.positions,
      postulants: req.body.postulants,
      interview: req.body.interview,
      result: req.body.result,
    },
    (err, updatedApplication) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (!updatedApplication) {
        return res.status(404).json({ message: `The application 'id' (${req.params.id}) given  does not exist.` });
      }
      return res.status(200).json({
        message: 'Application Updated',
        data: updatedApplication,
      });
    },
  );
};

const deleteApplication = (req, res) => {
  Applications.findByIdAndDelete(req.params.id, (error, chosenApplication) => {
    if (!chosenApplication) {
      return res
        .status(404)
        .json({ message: `Id ${req.params.id} does not exist` });
    }
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(204).send();
  });
};

module.exports = {
  createApplication,
  deleteApplication,
  listApplication,
  updateApplication,
};
