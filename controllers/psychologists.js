const Psychologists = require('../models/Psychologists');

const availabilityObjectAttrConstructor = (req) => {
  const keys = Object.keys(req.body.availability || {});
  return keys.reduce((resultObj, el) => ({
    ...resultObj,
    [`availability.${el}.availability`]: req.body.availability[el]?.availability,
    [`availability.${el}.from`]: req.body.availability[el]?.from,
    [`availability.${el}.to`]: req.body.availability[el]?.to,
  }), {});
};

const createPsychologist = (req, res) => {
  const psychologist = new Psychologists({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    availability: req.body.availability,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  psychologist.save((err, cbPsychologist) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(201).json(cbPsychologist);
  });
};

const updatePsychologist = (req, res) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      ...availabilityObjectAttrConstructor(req),
    },
    { new: true },
    (err, newPsychologist) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!newPsychologist) {
        return res.status(404).json({ msg: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
      }
      return res.status(200).json(newPsychologist);
    },
  );
};

const deletePsychologist = (req, res) => {
  Psychologists.findByIdAndDelete(req.params.id, (err, deletedPsychologist) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!deletedPsychologist) {
      return res.status(404).json({ msg: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(204).send(deletedPsychologist);
  });
};

const listAllPsychologists = (req, res) => {
  Psychologists.find()
    .then((psychologists) => {
      res.status(200).json(psychologists);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const listPsychologist = (req, res) => {
  Psychologists.findById(req.params.id, (err, foundPsychologist) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!foundPsychologist) {
      return res.status(404).json({ msg: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(200).send(foundPsychologist);
  });
};

module.exports = {
  listPsychologist,
  listAllPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
};
