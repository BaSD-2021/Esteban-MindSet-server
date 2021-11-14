const Clients = require('../models/Clients');

const listClients = (req, res) => {
  Clients.find()
    .then((clients) => res.status(200).json(clients))
    .catch((error) => res.status(400).json(error));
};

const createClient = (req, res) => {
  const clientCreated = new Clients({
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    logo: req.body.logo,
    description: req.body.description,
    created: {
      admin: req.body.created.admin,
      timestamp: new Date().toISOString(),
    },
    modified: {
      admin: req.body.modified.admin,
      timestamp: new Date().toISOString(),
    },
  });

  clientCreated.save((error, client) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(client);
  });
};

const deleteClient = (req, res) => {
  Clients.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      return res.status(400).json(`Client with id ${req.params.id} does not exist.`);
    }
    return res.status(204).json(`Client with id ${req.params.id} was deleted`);
  });
};

const updateClient = (req, res) => {
  Clients.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      location: {
        country: req.body.location.country,
        state: req.body.location.state,
        city: req.body.location.city,
        address: req.body.location.address,
      },
      logo: req.body.logo,
      description: req.body.description,
      modified: {
        admin: req.body.modified.admin,
        timestamp: new Date().getTime().toString(),
      },
    },
    { new: true },
    (error, newClient) => {
      if (!newClient) {
        return res.status(400).json({ msg: `Client with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json({ msg: 'Client updated', newClient });
    },
  );
};

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  listClients,
};
