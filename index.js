const express = require("express")
const clients = require("./controllers/clients")
const app = express()
const PORT = 4000

app.get("/", (req, res) => {
  res.send("La Bestia does the best readmes ever")
})

app.get("/clients/create", clients.createClient)

app.get("/clients/update/:id", clients.updateClient)

app.get("/clients/delete/:id", clients.deleteClient)

app.get("/clients", clients.listClients)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
