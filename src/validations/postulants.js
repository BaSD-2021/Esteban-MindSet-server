const { ObjectId } = require('mongoose').Types;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validatePostulant = (req, res, next) => {
  const bodyReq = req.body;
  if (!bodyReq.firstName) {
    return res.status(400).json({ message: 'firstName is wrong or missing' });
  }
  if (!bodyReq.lastName) {
    return res.status(400).json({ message: 'lastName is wrong or missing' });
  }
  if (!bodyReq.email || !bodyReq.email.match(emailRegex)) {
    return res.status(400).json({ message: 'email is wrong or missing' });
  }
  if (!bodyReq.password) {
    return res.status(400).json({ message: 'password is wrong or missing' });
  }
  if (!bodyReq.contactRange
    || !bodyReq.contactRange.from
    || !bodyReq.contactRange.to) {
    return res.status(400).json({ message: 'contactRange is wrong or missing' });
  }
  if (!bodyReq.address) {
    return res.status(400).json({ message: 'address is wrong or missing' });
  }
  if (!bodyReq.birthday || !bodyReq.birthday.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
    return res.status(400).json({ message: 'birthday is wrong or missing' });
  }
  if (!bodyReq.available || typeof bodyReq.available !== 'boolean') {
    return res.status(400).json({ message: 'available is wrong or missing' });
  }
  if (!bodyReq.phone) {
    return res.status(400).json({ message: 'phone is wrong or missing' });
  }
  return next();
};

const validateUpdatedPostulant = (req, res, next) => {
  const bodyReq = req.body;

  if (bodyReq.firstName && typeof bodyReq.firstName !== 'string') {
    return res.status(400).json({ message: 'firstName is wrong or missing' });
  }
  if (bodyReq.lastName && typeof bodyReq.lastName !== 'string') {
    return res.status(400).json({ message: 'lastName is wrong or missing' });
  }
  if (bodyReq.email && !bodyReq.email.match(emailRegex)) {
    return res.status(400).json({ message: 'email is wrong or missing' });
  }
  if (bodyReq.password && typeof bodyReq.password !== 'string') {
    return res.status(400).json({ message: 'password is wrong or missing' });
  }
  if (bodyReq.address && typeof bodyReq.address !== 'string') {
    return res.status(400).json({ message: 'address is wrong or missing' });
  }
  if (bodyReq.birthday && !bodyReq.birthday.match(/\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)) {
    return res.status(400).json({ message: 'birthday is wrong or missing' });
  }
  if (bodyReq.available && typeof bodyReq.available !== 'boolean') {
    return res.status(400).json({ message: 'available is wrong or missing' });
  }
  if (bodyReq.phone && Number.isNaN(bodyReq.phone)) {
    return res.status(400).json({ message: 'phone is wrong or missing' });
  }

  return next();
};

const validatePostulantId = (req, res, next) => {
  const paramsId = req.params.id;

  if (!ObjectId.isValid(paramsId)) {
    return res.status(400).json({ message: 'postulant id is wrong or missing' });
  }

  return next();
};

module.exports = {
  validatePostulant,
  validatePostulantId,
  validateUpdatedPostulant,
};
