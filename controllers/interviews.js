const fs = require('fs');
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
  const interview = new Interviews({
    idPostulant: req.query.idPostulant,
    idClient: req.query.idClient,
    idApplication: req.query.idApplication,
    status: req.query.status,
    date: req.query.date,
    notes: req.query.notes,
  });

  interview.save((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(interview);
  });
};

const updateInterview = (req, res) => {
  Interviews.findByIdAndUpdate(
    req.params.id,
    {
      idPostulant: req.query.idPostulant,
      idClient: req.query.idClient,
      idApplication: req.query.idApplication,
      status: req.query.status,
      date: req.query.date,
      notes: req.query.notes,
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
