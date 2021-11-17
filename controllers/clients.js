const Clients = require('../models/Clients');

const listClients = (req, res) => {
  Clients.find(req.query)
    .then((clients) => res.status(200).json(clients))
    .catch((error) => res.status(400).json({ message: error }));
};

const createClient = (req, res) => {
  const clientCreated = new Clients({
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    logo: req.body.logo,
    description: req.body.description,
  });

  clientCreated.save((error, client) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json({ message: client });
  });
};

const deleteClient = (req, res) => {
  Clients.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      return res.status(400).json({ message: `Client with id ${req.params.id} does not exist.` });
    }
    return res.status(204).send();
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
    },
    { new: true },
    (error, newClient) => {
      if (!newClient) {
        return res.status(400).json({ message: `Client with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json({ message: error });
      }
      return res.status(200).json({ message: 'Client updated', newClient });
    },
  );
};

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  listClients,
};
