const Interviews = require('../models/Interviews');

const listInterviews = (req, res) => {
  Interviews.find()
    .then((interviews) => {
      res.status(200).json(interviews);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const createInterview = (req, res) => {
  const bodyReq = req.body;
  const interview = new Interviews({
    postulant: req.body.postulant,
    client: req.body.client,
    application: bodyReq.application,
    status: bodyReq.status,
    date: bodyReq.date,
    notes: bodyReq.notes,
  });

  interview.save((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(interview);
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
        return res.status(400).json(error);
      }
      return res.status(201).json(newInterview);
    },
  );
};

const deleteInterview = (req, res) => {
  Interviews.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json('interview deleted successfully');
  });
};

module.exports = {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
};
