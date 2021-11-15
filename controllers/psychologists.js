const Psychologists = require('../models/Psychologists');

const getPsychologists = (req, res) => {
  // res.status(200).json(Psychologists);
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

const deletePsychologist = (req, res) => {
  Psychologists.findByIdAndDelete(req.params.id, (err, deletedPsychologist) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!deletedPsychologist) {
      return res.status(404).json({ msg: `The Psychologist 'id' (${req.params.id}) given  does not exist.` });
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

module.exports = {
  getPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
};
