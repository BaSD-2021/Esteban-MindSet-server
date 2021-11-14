const { ObjectId } = require('mongoose').Types;
const Interviews = require('../models/Interviews');

const validateInterview = (req, res, next) => {
  const bodyReq = req.body;
  const enu = {
    values: ['succesful', 'failed', 'cancelled', 'assigned', 'confirmed'],
  };

  if (!bodyReq.postulant || !ObjectId.isValid(bodyReq.postulant)) {
    return res.status(400).send('Postulant id is wrong or missing');
  }
  if (!bodyReq.client || !ObjectId.isValid(bodyReq.client)) {
    return res.status(400).send('Client id is wrong or missing');
  }
  if (!bodyReq.application || !ObjectId.isValid(bodyReq.application)) {
    return res.status(400).send('Application id is wrong or missing');
  }
  if (!bodyReq.status || !bodyReq.status.match(enu)) {
    return res.status(400).send('Status is wrong or missing');
  }
  if (!bodyReq.date || !bodyReq.date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
    return res.status(400).send('Date is wrong or missing');
  }
  next();
  return res.status(200);
};

const validateInterviewId = (req, res, next) => {
  const paramsId = req.params.id;

  Interviews.findById(paramsId, (error, interview) => {
    if (error || interview === null) {
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
