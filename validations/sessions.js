const { ObjectId } = require('mongoose').Types;

const statusEnum = {
  cancelled: 'cancelled',
  assigned: 'assigned',
  succesful: 'succesful',
};

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ msg: errorDescription });
};

const validateSessions = (req, res, next) => {
  const wrongParams = [];
  if (!ObjectId.isValid(req.body.postulant)) {
    wrongParams.push('Postulant ID');
  }
  if (!ObjectId.isValid(req.body.psychologist)) {
    wrongParams.push('Psychologist ID');
  }
  if (Object.values(statusEnum).includes(req.body.status)) {
    wrongParams.push('Status');
  }
  if (!req.body.date) {
    wrongParams.push('Date');
  }
  if (req.body.date) {
    try {
      if (new Date(Date.parse(req.body.date)).toISOString() !== req.body.date) {
        throw new Error('Wrong Date Format');
      }
    } catch {
      wrongParams.push('Date');
    }
  }
  if (wrongParams.length) {
    if (wrongParams.length === 1) {
      return errorResHelper(
        `Param ${wrongParams[0]} is missing or invalid`,
        res,
      );
    }
    return errorResHelper(
      `Params ${wrongParams
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }

  return next();
};

module.exports = { validateSessions };
