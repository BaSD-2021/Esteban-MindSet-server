const { startSession } = require('mongoose');
const Admins = require('../models/Admins');
const Firebase = require('../helper/firebase');

const getAdmins = (req, res) => {
  if ('_id' in req.query) {
    Admins.find({ _id: req.query, isDeleted: false })
      .then((admins) => res.status(200).json({
        message: 'List of admins',
        data: admins,
      }))
      .catch((error) => res.status(400).json({
        message: error,
      }));
  } else {
    Admins.find({ isDeleted: false })
      .then((admins) => res.status(200).json({
        message: 'List of admins',
        data: admins,
      }))
      .catch((error) => res.status(400).json({
        message: error,
      }));
  }
};

const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const adminCreated = new Admins({
      firebaseUid: newFirebaseUser.uid,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const admin = await adminCreated.save();

    return res.status(201).json({
      message: 'Admin created',
      data: admin,
    });
  } catch (error) {
    // Remove firebase user if it was created
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({ message: error });
  }
};

const updateAdmin = (req, res) => {
  Admins.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true },
    (error, newAdmin) => {
      if (!newAdmin) {
        return res.status(404).json({
          message: `Admin with id: ${req.params.id} was not found`,
        });
      }
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      return res.status(200).json({
        message: 'Admin succesfully updated!',
        data: newAdmin,
      });
    },
  );
};

const deleteAdmin = async (req, res) => {
  // Use session to handle rollback
  const session = await startSession();
  session.startTransaction();

  try {
    const response = await Admins.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    }).session(session);

    await Firebase.auth().deleteUser(response.firebaseUid);

    // Confirm DATABASE update
    session.commitTransaction();
    return res.status(204).send();
  } catch (error) {
    // Cancel DATABASE update
    session.abortTransaction();
    return res.status(400).json({
      message: `Admin with id ${req.params.id} does not exist.`,
    });
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
