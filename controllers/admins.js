const fs = require('fs');
const admins = require('../data/admins.json');

const getAdmins = (req, res) => {
  res.status(200).json(admins);
};

const updateAdmin = (req, res) => {
  let updatedAdmin;
  const updatedAdmins = admins.map((admin) => {
    if (admin.id === parseInt(req.params.id, 10)) {
      updatedAdmin = {
        id: parseInt(req.params.id, 10),
        email: req.query.email || admin.email,
        password: req.query.password || admin.password,
        name: req.query.name || admin.name,
      };
      return updatedAdmin;
    }
    return admin;
  });

  if (!updatedAdmin) {
    return res.status(400).json({ msg: `Admin with id: ${req.params.id} was not found` });
  }

  return fs.writeFile('./data/admins.json', JSON.stringify(updatedAdmins), {}, (error) => {
    if (error) {
      return res.status(400).send(error);
    }
    return res.status(200).json({ msg: 'Admin updated', updatedAdmins });
  });
};

module.exports = {
  getAdmins,
  updateAdmin,
};
