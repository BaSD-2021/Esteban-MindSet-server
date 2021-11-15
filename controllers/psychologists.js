const Psychologists = require('../models/Psychologists');

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

const updatePsychologist = (req, res) => {
  // const params = req.query;
  // let updatedPsychologist;

  // const updatedPsychologists = Psychologists.map((psychologist) => {
  //   if (psychologist.id === params.id) {
  //     updatedPsychologist = {
  //       id: params.id,
  //       first_name: params.first_name || psychologist.first_name,
  //       last_name: params.last_name || psychologist.last_name,
  //       phone: params.phone || psychologist.phone,
  //       email: params.email || psychologist.email,
  //       availability: JSON.parse(req.query.availability) || psychologist.availability,
  //       address: params.address || psychologist.address,
  //     };
  //     return updatedPsychologist;
  //   }
  //   return psychologist;
  // });

  // if (!updatedPsychologist) {
  //   return res.status(404).send('psychologist not found');
  // }
  // if (JSON.stringify(updatedPsychologists) === JSON.stringify(Psychologists)) {
  //   return res.status(200).send('psychologist found, but there was nothing to change');
  // }

  // return fs.writeFile('./data/psychologists.json', JSON.stringify(updatedPsychologists), {}, (error) => {
  //   if (error) {
  //     res.status(400).send(error);
  //   }
  //   return res.status(200).json(updatedPsychologists);
  // });
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
