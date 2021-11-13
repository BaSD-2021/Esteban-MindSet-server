const Interviews = require('../models/Interviews');

const validateInterview = (req, res, next) => {
  const bodyReq = req.body;
  if (!bodyReq.postulant) {
    return res.status(400).send('Postulant id is required');
  }
  if (!bodyReq.client) {
    return res.status(400).send('Client id is required');
  }
  if (!bodyReq.application) {
    return res.status(400).send('Application id is required');
  }
  if (!bodyReq.status) {
    return res.status(400).send('Status is required');
  }
  if (!bodyReq.date) {
    return res.status(400).send('Date is required');
  }
  next();
  return res.status(200);
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
