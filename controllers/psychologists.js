const fs = require('fs');
const Psychologists = require('../data/psychologists.json');

const getPsychologists = (req, res) => {
  res.status(200).json(Psychologists);
};

const createPsychologist = (req, res) => {
  const params = req.query;

  const newPsychologist = {
    id: new Date().getTime().toString(),
    first_name: params.first_name,
    last_name: params.last_name,
    phone: params.phone,
    email: params.email,
    availability: JSON.parse(req.query.availability),
    address: params.address,
  };

  Psychologists.push(newPsychologist);

  fs.writeFile('./data/psychologists.json', JSON.stringify(Psychologists), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    return res.status(201).json(newPsychologist);
  });
};

const deletePsychologist = (req, res) => {
  const params = req.query;
  let psychologistDeleted;
  const filteredPsychologists = Psychologists.filter((psychologist) => {
    if (psychologist.id !== params.id) {
      psychologistDeleted = psychologist;
      return false;
    }
    return true;
  });

  if (!psychologistDeleted) {
    return res.status(404).send('psychologist not found');
  }

  return fs.writeFile('./data/psychologists.json', JSON.stringify(filteredPsychologists), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    return res.status(204).json(psychologistDeleted);
  });
};

const updatePsychologist = (req, res) => {
  const params = req.query;
  let updatedPsychologist;

  const updatedPsychologists = Psychologists.map((psychologist) => {
    if (psychologist.id === params.id) {
      updatedPsychologist = {
        id: params.id,
        first_name: params.first_name || psychologist.first_name,
        last_name: params.last_name || psychologist.last_name,
        phone: params.phone || psychologist.phone,
        email: params.email || psychologist.email,
        availability: JSON.parse(req.query.availability) || psychologist.availability,
        address: params.address || psychologist.address,
      };
      return updatedPsychologist;
    }
    return psychologist;
  });

  if (!updatedPsychologist) {
    return res.status(404).send('psychologist not found');
  }
  if (JSON.stringify(updatedPsychologists) === JSON.stringify(Psychologists)) {
    return res.status(200).send('psychologist found, but there was nothing to change');
  }

  return fs.writeFile('./data/psychologists.json', JSON.stringify(updatedPsychologists), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    return res.status(200).json(updatedPsychologists);
  });
};

module.exports = {
  getPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
};
