const { ObjectId } = require('mongoose').Types;

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ msg: errorDescription });
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

const availabiltyObjectValidator = (object) => {
  Object.keys(availabilityObjectModel).reduce((isValid, el) => {
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
      `The Psychologist 'Id' (${req.params.id}) given is invalid`,
      res,
    );
  }
  return next();
};

const validatePsychologists = (req, res, next) => {
  const invalidParams = [];
  if (typeof req.body.first_name !== 'string') {
    invalidParams.push("'first_name'");
  }
  if (typeof req.body.last_name !== 'string') {
    invalidParams.push("'last_name'");
  }
  if (!availabiltyObjectValidator(req.body.availability)) {
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
  if (req.body.address && typeof req.body.phone !== 'string') {
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

const validatePsychologistsUsedAttr = (req, res, next) => next();

module.exports = { validatePsychologists, validatePsychologistsUsedAttr, validateIdFormat };
