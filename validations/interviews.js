const Interviews = require("../models/Interviews");

const validateInterview = (req, res, next) => {
  const queries = req.query;
  if (!queries.idPostulant) {
    return res.status(400).send('Postulant id is required');
  }
  if (!queries.idClient) {
    return res.status(400).send('Client id is required');
  }
  if (!queries.idApplication) {
    return res.status(400).send('Application id is required');
  }
  if (!queries.status) {
    return res.status(400).send('Status is required');
  }
  if (!queries.date) {
    return res.status(400).send('Date is required');
  }
  next();
};

const validateInterviewId = (req, res, next) => {
  const paramsId = req.params.id;
  Interviews.findById(paramsId, (error) => {
    if (error) {
      return res.status(400).send('Interview id does not exist');
    }
    return res.status(200);
  });
  next();
};

module.exports = {
  validateInterview,
  validateInterviewId,
};

// idPostulant: req.query.idPostulant,
// idClient: req.query.idClient,
// idApplication: req.query.idApplication,
// status: req.query.status,
// date: req.query.date,
// notes: req.query.notes,
