const { ObjectId } = require('mongoose').Types;

const statusEnum = {
  cancelled: 'cancelled',
  assigned: 'assigned',
  succesful: 'succesful',
};

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ message: errorDescription });
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return errorResHelper(
      `The Session 'Id' (${req.params.id}) given is invalid`,
      res,
    );
  }
  return next();
};

const validateSessions = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (!ObjectId.isValid(req.body.postulant)) {
    invalidBodyAttrs.push("'Postulant ID'");
  }
  if (!ObjectId.isValid(req.body.psychologist)) {
    invalidBodyAttrs.push("'Psychologist ID'");
  }
  if (!Object.values(statusEnum).includes(req.body.status)) {
    invalidBodyAttrs.push("'Status'");
  }
  if (!req.body.date) {
    invalidBodyAttrs.push("'Date'");
  }
  if (req.body.date) {
    try {
      if (new Date(Date.parse(req.body.date)).toISOString() !== req.body.date) {
        throw new Error('Wrong Date Format');
      }
    } catch {
      invalidBodyAttrs.push("'Date'");
    }
  }
  if (invalidBodyAttrs.length === 1) {
    return errorResHelper(
      `Param ${invalidBodyAttrs[0]} is missing or invalid`,
      res,
    );
  }
  if (invalidBodyAttrs.length > 1) {
    return errorResHelper(
      `Params ${invalidBodyAttrs
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }
  return next();
};

const validateSessionsUsedAttr = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (req.body.postulant && !ObjectId.isValid(req.body.postulant)) {
    invalidBodyAttrs.push("'Postulant ID'");
  }
  if (req.body.psychologist && !ObjectId.isValid(req.body.psychologist)) {
    invalidBodyAttrs.push("'Psychologist ID'");
  }
  if (req.body.status && !Object.values(statusEnum).includes(req.body.status)) {
    invalidBodyAttrs.push("'Status'");
  }
  if (req.body.date) {
    try {
      if (new Date(Date.parse(req.body.date)).toISOString() !== req.body.date) {
        throw new Error('Wrong Date Format');
      }
    } catch {
      invalidBodyAttrs.push("'Date'");
    }
  }
  if (invalidBodyAttrs.length === 1) {
    return errorResHelper(
      `Param ${invalidBodyAttrs[0]} is invalid`,
      res,
    );
  }
  if (invalidBodyAttrs.length > 1) {
    return errorResHelper(
      `Params ${invalidBodyAttrs
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are invalid.`,
      res,
    );
  }
  return next();
};

module.exports = { validateSessions, validateSessionsUsedAttr, validateIdFormat };
