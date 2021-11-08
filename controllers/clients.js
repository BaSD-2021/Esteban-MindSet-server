const fs = require("fs")
const clients = require("../data/clients.json")

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ error: errorDescription })
}

const createClient = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  const newClient = {
    idClient: new Date().getTime().toString(),
    name: req.query.name ?? missing.push("'name'"),
    phone: req.query.phone ?? missing.push("'phone'"),
    location: {
      country: req.query.country ?? missing.push("'country'"),
      state: req.query.state ?? missing.push("'state'"),
      city: req.query.city ?? missing.push("'city'"),
      address: req.query.address ?? missing.push("'address'"),
    },
    description: req.query.description ?? missing.push("'description'"),
    logo: req.query.logo ?? missing.push("'logo'"),
    created: {
      idAdmin: req.query.idAdmin ?? missing.push("'idAdmin'"),
      timestamp: now2ISO,
    },
    modified: {},
  }

  if (clients.filter((el) => el.name === req.query.name).length > 0) {
    return errorResHelper(
      `Client name '${req.query.name}' already exists.`,
      res
    )
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing
        .join(", ")
        .replace(/,([^,]*)$/, " and" + "$1")} is missing.`,
      res
    )
  }

  clients.push(newClient)

  fs.writeFile("./data/clients.json", JSON.stringify(clients), (err) => {
    if (err) {
      return errorResHelper(err, res)
    }
    return res.status(201).json(newClient)
  })
}
const updateClient = (req, res) => {
  const now2ISO = new Date().toISOString()
  const missing = []
  let clientFoundPosition

  clients.forEach((client, id) => {
    if (client.idClient === parseInt(req.params.id)) {
      client.name = req.query.name ?? client.name
      client.phone = req.query.phone ?? client.phone
      client.location.country = req.query.country ?? client.location.country
      client.location.state = req.query.state ?? client.state
      client.location.city = req.query.city ?? client.city
      client.location.address = req.query.address ?? client.address
      client.description = req.query.description ?? client.description
      client.logo = req.query.logo ?? client.logo
      client.modified = {
        idAdmin: parseInt(req.query.idAdmin ?? missing.push("'idAdmin'")),
        timestamp: now2ISO,
      }
      clientFoundPosition = id + 1
    }
  })

  if (!clientFoundPosition) {
    return errorResHelper(
      `The 'idClient' (${req.params.id}) given does not exist.`,
      res,
      404
    )
  }

  if (missing.length) {
    return errorResHelper(
      `queryParam ${missing.join(" and ")} is missing.`,
      res
    )
  }

  fs.writeFile("./data/clients.json", JSON.stringify(clients), (err) => {
    if (err) {
      return errorResHelper(err, res)
    }
    return res.status(201).json(clients[clientFoundPosition - 1])
  })
}
const deleteClient = (req, res) => {}
const listClients = (req, res) => {}

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  listClients,
}
