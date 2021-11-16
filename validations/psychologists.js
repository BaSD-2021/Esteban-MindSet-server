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
  sunday: {
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
  const invalidParams = [];
  if (typeof req.body.firstName !== 'string') {
    invalidParams.push("'firstName'");
  }
  if (typeof req.body.lastName !== 'string') {
    invalidParams.push("'lastName'");
  }
  if (!availabilityObjectUpdateValidator(req.body.availability)) {
    invalidParams.push("'availability'");
  }
  if (typeof req.body.username !== 'string') {
    invalidParams.push("'username'");
  }
  if (typeof req.body.password !== 'string') {
    invalidParams.push("'password'");
  }
  if (typeof req.body.email !== 'string') {
    invalidParams.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidParams.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidParams.push("'address'");
  }
  if (invalidParams.length === 1) {
    return errorResHelper(
      `Param ${invalidParams[0]} is missing or invalid`,
      res,
    );
  }
  if (invalidParams.length > 1) {
    return errorResHelper(
      `Params ${invalidParams
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }
  return next();
};

const validatePsychologistsUsedAttr = (req, res, next) => {
  const invalidParams = [];
  if (req.body.firstName && typeof req.body.firstName !== 'string') {
    invalidParams.push("'firstName'");
  }
  if (req.body.lastName && typeof req.body.lastName !== 'string') {
    invalidParams.push("'lastName'");
  }
  if (req.body.availability && !availabilityObjectValidator(req.body.availability)) {
    invalidParams.push("'availability'");
  }
  if (req.body.username && typeof req.body.username !== 'string') {
    invalidParams.push("'username'");
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    invalidParams.push("'password'");
  }
  if (req.body.email && typeof req.body.email !== 'string') {
    invalidParams.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidParams.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidParams.push("'address'");
  }
  if (invalidParams.length === 1) {
    return errorResHelper(
      `Param ${invalidParams[0]} is missing or invalid`,
      res,
    );
  }
  if (invalidParams.length > 1) {
    return errorResHelper(
      `Params ${invalidParams
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }
  return next();
};

module.exports = { validatePsychologists, validatePsychologistsUsedAttr, validateIdFormat };
