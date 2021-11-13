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
  let deletedInterview;
  const filteredInterview = Interviews.filter((interview) => {
    if (interview.id === req.query.id) {
      deletedInterview = interview;
      return false;
    }
    return true;
  });
  if (!deletedInterview) {
    return res.status(404).send('Interview NOT found');
  }
  fs.writeFile('./data/interviews.json', JSON.stringify(filteredInterview), {}, (error) => {
    if (error) {
      return res.status(400).send(error);
    }
  });
  return res.status(204).send(deletedInterview);
};

module.exports = {
  listInterviews, createInterview, updateInterview, deleteInterview,
};
