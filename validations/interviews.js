const { ObjectId } = require('mongoose').Types;

const validateInterview = (req, res, next) => {
  const bodyReq = req.body;
  const enu = {
    values: ['successful', 'failed', 'cancelled', 'assigned', 'confirmed'],
  };

  if (!bodyReq.postulant || !ObjectId.isValid(bodyReq.postulant)) {
    return res.status(400).json({ message: 'Postulant id is wrong or missing' });
  }
  if (!bodyReq.client || !ObjectId.isValid(bodyReq.client)) {
    return res.status(400).json({ message: 'Client id is wrong or missing' });
  }
  if (!bodyReq.application || !ObjectId.isValid(bodyReq.application)) {
    return res.status(400).json({ message: 'Application id value is incorrect' });
  }
  if (!bodyReq.status || !bodyReq.status.match(enu)) {
    return res.status(400).json({ message: 'Status is wrong or missing' });
  }
  if (!bodyReq.date || !bodyReq.date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
    return res.status(400).json({ message: 'Date is wrong or missing' });
  }
  return next();
};

const validateUpdatedInterview = (req, res, next) => {
  const bodyReq = req.body;
  const enu = {
    values: ['successful', 'failed', 'cancelled', 'assigned', 'confirmed'],
  };

  if (bodyReq.postulant && !ObjectId.isValid(bodyReq.postulant)) {
    return res.status(400).json({ message: 'Postulant id value is incorrect' });
  }
  if (bodyReq.client && !ObjectId.isValid(bodyReq.client)) {
    return res.status(400).json({ message: 'Client id value is incorrect' });
  }
  if (bodyReq.application && !ObjectId.isValid(bodyReq.application)) {
    return res.status(400).json({ message: 'Application id value is incorrect' });
  }
  if (bodyReq.status && !bodyReq.status.match(enu)) {
    return res.status(400).json({ message: 'Status value is incorrect' });
  }
  if (bodyReq.date && !bodyReq.date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
    return res.status(400).json({ message: 'Date value is incorrect' });
  }
  return next();
};

const validateInterviewId = (req, res, next) => {
  const paramsId = req.params.id;

  if (!paramsId || !ObjectId.isValid(paramsId)) {
    return res.status(400).json({ message: 'Interview id value is incorrect' });
  }

  return next();
};

module.exports = {
  validateInterview,
  validateInterviewId,
  validateUpdatedInterview,
};
