const Clients = require('../models/Clients');

const listClients = (req, res) => {
  Clients.find()
  .then((clients) => {
    return res.status(200).json(clients)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}
  
// const createClient = (req, res) => {

// const updateClient = (req, res) => {
  
// }

// const deleteClient = (req, res) => {
  
// }

module.exports = {
  // createClient,
  // updateClient,
  // deleteClient,
  listClients,
}
