const Postulants = require('../models/Postulants');
const Firebase = require('../helper/firebase');

const listPostulants = (req, res) => {
  if ('_id' in req.query) {
    Postulants.find({ _id: req.query, isDeleted: false }).populate('profiles.profileId', 'name')
      .then((postulants) => {
        res.status(200).json({
          message: 'List of Postulants',
          data: postulants,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error,
        });
      });
  } else {
    Postulants.find({ isDeleted: false }).populate('profiles.profileId', 'name')
      .then((postulants) => {
        res.status(200).json({
          message: 'List of Postulants',
          data: postulants,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error,
        });
      });
  }
};

const createPostulant = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'POSTULANT' });
    const postulant = new Postulants(
      {
        firebaseUid: newFirebaseUser.uid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        contactRange: req.body.contactRange,
        address: req.body.address,
        birthday: req.body.birthday,
        available: req.body.available,
        phone: req.body.phone,
        profiles: req.body.profiles,
        studies: req.body.studies,
        workExperience: req.body.workExperience,
      },
    );

    const postulantSaved = await postulant.save();

    return res.status(201).json({
      message: 'Postulant created',
      data: postulantSaved,
    });
  } catch (error) {
    // Remove firebase user if it was created
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }

    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const deletePostulant = (req, res) => {
  Postulants.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  }, (error, pointedPostulant) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (!pointedPostulant) {
      return res.status(404).json({
        message: 'Postulant Id does not exist',
      });
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
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (!newPostulant) {
        return res.status(404).json({
          message: 'Postulant Id does not exist',
        });
      }
      return res.status(200).json({
        message: 'Postulant updated',
        data: newPostulant,
      });
    },
  );
};

module.exports = {
  listPostulants,
  createPostulant,
  deletePostulant,
  updatePostulants,
};
