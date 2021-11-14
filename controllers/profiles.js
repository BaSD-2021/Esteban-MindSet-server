const fs = require('fs');
const profiles = require('../data/profiles.json');

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ error: errorDescription });
};

const createProfile = (req, res) => {
  const now2ISO = new Date().toISOString();
  const missing = [];
  const newProfile = {
    id: new Date().getTime().toString(),
    name: req.query.name ?? missing.push("'name'"),
    created: {
      idAdmin: req.query.idAdmin ?? missing.push("'idAdmin'"),
      timestamp: now2ISO,
    },
    modified: {},
  };

  if (profiles.filter((el) => el.name === req.query.name).length > 0) {
    return errorResHelper(
      `Profile name '${req.query.name}' already exists.`,
      res,
    );
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(' and ')} is missing.`,
      res,
    );
  }

  profiles.push(newProfile);

  return fs.writeFile('./data/profiles.json', JSON.stringify(profiles), (err) => {
    if (err) {
      return errorResHelper(err, res);
    }
    return res.status(201).json(newProfile);
  });
};

const updateProfile = (req, res) => {
  const now2ISO = new Date().toISOString();
  const missing = [];
  let profileUpdated;

  const profilesUpdated = profiles.map((profile) => {
    if (profile.id === parseInt(req.params.id, 10)) {
      profileUpdated = {
        name: req.query.name ?? profile.name,
        modified: {
          idAdmin: parseInt(req.query.idAdmin ?? missing.push("'idAdmin'"), 10),
          timestamp: now2ISO,
        },
      };
      return profileUpdated;
    }
    return profile;
  });

  if (!profileUpdated) {
    return errorResHelper(
      `The profile 'id' (${req.params.id}) given does not exist.`,
      res,
      404,
    );
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(' and ')} is missing.`,
      res,
    );
  }

  return fs.writeFile('./data/profiles.json', JSON.stringify(profilesUpdated), (err) => {
    if (err) {
      return errorResHelper(err, res);
    }
    return res.status(200).json(profilesUpdated);
  });
};

const deleteProfile = (req, res) => {
  let removedProfile;
  const profilesUpdated = profiles.filter((profile) => {
    if (profile.id === parseInt(req.params.id, 10)) {
      removedProfile = profile;
      return false;
    }
    return true;
  });

  if (!removedProfile) {
    return errorResHelper(
      `The profile 'id' (${req.params.id}) given does not exist.`,
      res,
      404,
    );
  }

  return fs.writeFile('./data/profiles.json', JSON.stringify(profilesUpdated), (err) => {
    if (err) {
      return errorResHelper(err, res);
    }
    return res.status(204).json(removedProfile);
  });
};

const listProfiles = (req, res) => {
  if (!profiles.length) {
    return errorResHelper('The Profiles List seems to be empty.', res, 404);
  }
  return res.status(200).json(profiles);
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
};
