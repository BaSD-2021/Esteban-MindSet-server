const { startSession } = require('mongoose');
const Firebase = require('../helper/firebase');
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

const listPsychologists = (req, res) => {
  if ('_id' in req.query) {
    Psychologists.find({ _id: req.query, isDeleted: false })
      .then((psychologists) => {
        res.status(200).json({
          message: 'List of Psychologists',
          data: psychologists,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } else {
    Psychologists.find({ isDeleted: false })
      .then((psychologists) => {
        res.status(200).json({
          message: 'List of Psychologists',
          data: psychologists,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
};

const createPsychologist = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'PSYCHOLOGIST' });

    const newPsychologist = new Psychologists({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      availability: req.body.availability,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });

    const psychologist = await newPsychologist.save();

    return res.status(201).json({
      message: 'Psychologist created',
      data: psychologist,
    });
  } catch (error) {
    // Remove firebase user if it was created
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({ message: error });
  }
};

const updatePsychologist = (req, res) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      ...availabilityObjectAttrConstructor(req),
    },
    { new: true },
    (err, updatedPsychologist) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (!updatedPsychologist) {
        return res.status(404).json({ message: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
      }
      return res.status(200).json({
        message: 'Psychologist Updated',
        data: updatedPsychologist,
      });
    },
  );
};

const deletePsychologist = async (req, res) => {
  // Use session to handle rollback
  const session = await startSession();
  session.startTransaction();

  try {
    const response = await Psychologists.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    }).session(session);

    await Firebase.auth().deleteUser(response.firebaseUid);

    // Confirm DATABASE update
    session.commitTransaction();
    return res.status(204).send();
  } catch (error) {
    // Cancel DATABASE update
    session.abortTransaction();
    return res.status(404).json({
      message: `The psychologist 'id' (${req.params.id}) given  does not exist.`,
    });
  }
};

module.exports = {
  listPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
};
