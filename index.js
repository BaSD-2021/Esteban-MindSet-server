const express = require("express")
const profiles = require("./controllers/profiles")
const clients = require("./controllers/clients")
const positions = require("./controllers/positions.js")
const applications = require("./controllers/applications")
const psychologists = require("./controllers/psychologists.js")
const app = express()
const PORT = 4000

app.get("/", (req, res) => {
  res.send("La Bestia does the best readmes ever")
})

app.get("/profiles", profiles.listProfiles)
app.get("/profiles/create", profiles.createProfile)
app.get("/profiles/update/:id", profiles.updateProfile)
app.get("/profiles/delete/:id", profiles.deleteProfile)

app.get("/clients", clients.listClients)
app.get("/clients/create", clients.createClient)
app.get("/clients/update/:id", clients.updateClient)
app.get("/clients/delete/:id", clients.deleteClient)

app.get("/positions", positions.listPositions)
app.get("/positions/create", positions.createPosition)
app.get("/positions/remove", positions.deletePosition)
app.get("/positions/update", positions.updatePosition)

app.get("/applications", applications.listApplication)
app.get("/applications/create", applications.createApplication)
app.get("/applications/delete", applications.deleteApplication)

app.get("/psychologists", psychologists.getPsychologists)
app.get("/psychologists/create", psychologists.createPsychologist)
app.get("/psychologists/delete", psychologists.deletePsychologist)
app.get("/psychologists/update", psychologists.updatePsychologist)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
