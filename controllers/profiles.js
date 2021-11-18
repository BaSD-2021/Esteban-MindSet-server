const Profiles = require('../models/Profiles');

const listProfiles = (req, res) => {
  Profiles.find(req.query)
    .then((profiles) => res.status(200).json({ message: 'profiles list', data: profiles }))
    .catch((error) => res.status(400).json({ message: error }));
};

const createProfile = (req, res) => {
  const profile = new Profiles({
    name: req.body.name,
  });

  profile.save((error) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json({ message: 'profile created', data: profile });
  });
};

const updateProfile = (req, res) => {
  Profiles.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true },
    (error, newProfile) => {
      if (error) {
        return res.status(400).json({ message: error });
      }
      if (!newProfile) {
        return res.status(404).send({ message: 'Profile id does not exist' });
      }
      return res.status(200).json({ message: 'profile updated', data: newProfile });
    },
  );
};

const deleteProfile = (req, res) => {
  Profiles.findByIdAndDelete(req.params.id, (error, pointedProfile) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    if (!pointedProfile) {
      return res.status(404).send({ message: 'Profile id does not exist' });
    }
    return res.status(204).send();
  });
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
};
