const Interviews = require('../models/Interviews');

const listInterviews = (req, res) => {
  if ('_id' in req.query) {
    Interviews.find({ _id: req.query, isDeleted: false }).populate('postulant').populate('client').populate('application')
      .then((interviews) => {
        res.status(200).json({
          message: 'List of Interviews',
          data: interviews,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error,
        });
      });
  } else {
    Interviews.find({ isDeleted: false }).populate('postulant').populate('client').populate('application')
      .then((interviews) => {
        res.status(200).json({
          message: 'List of Interviews',
          data: interviews,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error,
        });
      });
  }
};

const createInterview = (req, res) => {
  const bodyReq = req.body;
  const interview = new Interviews({
    postulant: bodyReq.postulant,
    client: bodyReq.client,
    application: bodyReq.application,
    status: bodyReq.status,
    date: bodyReq.date,
    notes: bodyReq.notes,
  });

  interview.populate('postulant');
  interview.populate('client');
  interview.populate('application');

  interview.save((error) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    return res.status(201).json({
      message: 'Interview created',
      data: interview,
    });
  });
};

const updateInterview = (req, res) => {
  const bodyReq = req.body;
  Interviews.findByIdAndUpdate(
    req.params.id,
    {
      postulant: bodyReq.postulant,
      client: bodyReq.client,
      application: bodyReq.application,
      status: bodyReq.status,
      date: bodyReq.date,
      notes: bodyReq.notes,
    },
    { new: true },
    (error, newInterview) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (!newInterview) {
        return res.status(404).json({
          message: 'Interview Id does not exist',
        });
      }

      return res.status(200).json({
        message: 'Interview updated',
        data: newInterview,
      });
    },
  ).populate('postulant').populate('client').populate('application');
};

const deleteInterview = (req, res) => {
  Interviews.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  }, (error, pointedInterview) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (!pointedInterview) {
      return res.status(404).json({
        message: 'Interview Id does not exist',
      });
    }
    return res.status(204).send();
  });
};

module.exports = {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
};
