const fs = require("fs")
const clients = require("../data/clients.json")

const errorResHelper = (errorDescription, res) => {
  res.status(400).send(
    JSON.stringify({
      error: errorDescription,
    })
  )
}

const createClient = (req, res) => {}
const updateClient = (req, res) => {}
const removeClient = (req, res) => {}
const listClients = (req, res) => {}

module.exports = {
  createClient,
  updateClient,
  removeClient,
  listClients,
}
