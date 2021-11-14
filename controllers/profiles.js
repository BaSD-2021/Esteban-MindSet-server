const Profiles = require('../models/Profiles');

const createProfile = (req, res) => {
  const profile = new Profiles({
    name: req.body.name,
  });

  profile.save((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(profile);
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
      if (!newProfile) {
        return res.status(404).json('Profile id does not exist');
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(201).json(newProfile);
    },
  );
};

const deleteProfile = (req, res) => {
  Profiles.findByIdAndDelete(req.params.id, (error, pointedProfile) => {
    if (!pointedProfile) {
      return res.status(404).json('Profile id does not exist');
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send();
  });
};

const listProfiles = (req, res) => {
  Profiles.find()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
};
