const { ObjectId } = require('mongoose').Types;

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ message: errorDescription });
};

const availabilityObjectModel = {
  monday: {
    availability: '',
    from: '',
    to: '',
  },
  tuesday: {
    availability: '',
    from: '',
    to: '',
  },
  wednesday: {
    availability: '',
    from: '',
    to: '',
  },
  thursday: {
    availability: '',
    from: '',
    to: '',
  },
  friday: {
    availability: '',
    from: '',
    to: '',
  },
  saturday: {
    availability: '',
    from: '',
    to: '',
  },
};

const availabilityObjectValidator = (object) => {
  const keys = Object.keys(availabilityObjectModel);
  return keys.reduce(
    (isValid, el) => {
      if (el in object
      && ((object[el].availability && typeof object[el].availability !== 'boolean')
      || (object[el].from && typeof object[el].from !== 'number')
      || (object[el].to && typeof object[el].to !== 'number'))) {
        return false;
      }
      return isValid && true;
    },
    true,
  );
};

const availabilityObjectUpdateValidator = (object) => {
  const keys = Object.keys(availabilityObjectModel);
  return keys.reduce((isValid, el) => {
    if (el in object
      && typeof object[el].availability === 'boolean'
      && typeof object[el].from === 'number'
      && typeof object[el].to === 'number') {
      return isValid && true;
    }
    return false;
  }, true);
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return errorResHelper(
      `The psychologist 'Id' (${req.params.id}) given is invalid`,
      res,
    );
  }
  return next();
};

const validatePsychologists = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (typeof req.body.firstName !== 'string') {
    invalidBodyAttrs.push("'firstName'");
  }
  if (typeof req.body.lastName !== 'string') {
    invalidBodyAttrs.push("'lastName'");
  }
  if (!availabilityObjectUpdateValidator(req.body.availability)) {
    invalidBodyAttrs.push("'availability'");
  }
  if (typeof req.body.username !== 'string') {
    invalidBodyAttrs.push("'username'");
  }
  if (typeof req.body.password !== 'string') {
    invalidBodyAttrs.push("'password'");
  }
  if (typeof req.body.email !== 'string') {
    invalidBodyAttrs.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidBodyAttrs.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidBodyAttrs.push("'address'");
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

const validatePsychologistsUsedAttr = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (req.body.firstName && typeof req.body.firstName !== 'string') {
    invalidBodyAttrs.push("'firstName'");
  }
  if (req.body.lastName && typeof req.body.lastName !== 'string') {
    invalidBodyAttrs.push("'lastName'");
  }
  if (req.body.availability && !availabilityObjectValidator(req.body.availability)) {
    invalidBodyAttrs.push("'availability'");
  }
  if (req.body.username && typeof req.body.username !== 'string') {
    invalidBodyAttrs.push("'username'");
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    invalidBodyAttrs.push("'password'");
  }
  if (req.body.email && typeof req.body.email !== 'string') {
    invalidBodyAttrs.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidBodyAttrs.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidBodyAttrs.push("'address'");
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

module.exports = { validatePsychologists, validatePsychologistsUsedAttr, validateIdFormat };
