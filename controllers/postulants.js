const Postulants = require('../models/Postulants');

const listPostulants = (req, res) => {
  Postulants.find(req.query)
    .then((postulants) => {
      res.status(200).json(postulants);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const createPostulant = (req, res) => {
  const bodyReq = req.body;
  const postulant = new Postulants({
    firstName: bodyReq.firstName,
    lastName: bodyReq.lastName,
    email: bodyReq.email,
    password: bodyReq.password,
    contactRange: bodyReq.contactRange,
    address: bodyReq.address,
    birthday: bodyReq.birthday,
    available: bodyReq.available,
    phone: bodyReq.phone,
    profiles: bodyReq.profiles,
    studies: bodyReq.studies,
    workExperience: bodyReq.workExperience,
  });

  postulant.save(((error) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json(postulant);
  }));
};

const deletePostulant = (req, res) => {
  Postulants.findByIdAndDelete(req.params.id, (error, pointedPostulant) => {
    if (!pointedPostulant) {
      return res.status(404).json({ message: 'Postulant id does not exist' });
    }
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(204).send();
  });
};

const updatePostulants = (req, res) => {
  const bodyReq = req.body;

  Postulants.findByIdAndUpdate(
    req.params.id,
    {
      firstName: bodyReq.firstName,
      lastName: bodyReq.lastName,
      email: bodyReq.email,
      password: bodyReq.password,
      contactRange: bodyReq.contactRange,
      address: bodyReq.address,
      birthday: bodyReq.birthday,
      available: bodyReq.available,
      phone: bodyReq.phone,
      profiles: bodyReq.profiles,
      'studies.primaryStudies': bodyReq.studies.primaryStudies,
      'studies.secondaryStudies': bodyReq.studies.secondaryStudies,
      'studies.tertiaryStudies': bodyReq.studies.tertiaryStudies,
      'studies.universityStudies': bodyReq.studies.universityStudies,
      'studies.informalStudies': bodyReq.studies.informalStudies,
      workExperience: bodyReq.workExperience,
    },
    { new: true },
    (error, newPostulant) => {
      if (!newPostulant) {
        return res.status(404).json({ message: 'Postulant id does not exist' });
      }

      if (error) {
        return res.status(400).json({ message: error });
      }
      return res.status(201).json(newPostulant);
    },
  );
};

module.exports = {
  listPostulants,
  createPostulant,
  deletePostulant,
  updatePostulants,
};
