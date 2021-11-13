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
  const queries = req.query;
  const interview = new Interviews({
    idPostulant: queries.idPostulant,
    idClient: queries.idClient,
    idApplication: queries.idApplication,
    status: queries.status,
    date: queries.date,
    notes: queries.notes,
  });

  interview.save((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(interview);
  });
};

const updateInterview = (req, res) => {
  const queries = req.query;
  Interviews.findByIdAndUpdate(
    req.params.id,
    {
      idPostulant: queries.idPostulant,
      idClient: queries.idClient,
      idApplication: queries.idApplication,
      status: queries.status,
      date: queries.date,
      notes: queries.notes,
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
