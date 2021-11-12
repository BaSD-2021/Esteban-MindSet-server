const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router')

// const sessions = require('./controllers/sessions')
// const interviews = require('./controllers/interviews')
// const profiles = require("./controllers/profiles")
// const clients = require("./controllers/clients")
// const positions = require("./controllers/positions")
// const applications = require("./controllers/applications")
// const psychologists = require("./controllers/psychologists")
// const admins = require('./controllers/admins');

const app = express()
const PORT = 4000

mongoose.connect(
  'mongodb+srv://BaSD:BaSD2021@cluster0.5vk6q.mongodb.net/mindSet?retryWrites=true&w=majority',
  (error) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      console.log("Database connected")
    }
  }
)

app.use(cors())

app.use('/api', router)

// app.get('/sessions', sessions.listSession)
// app.get('/sessions/create', sessions.createSession)
// app.get('/sessions/update', sessions.updateSession)
// app.get('/sessions/delete', sessions.deleteSession)

// app.get('/interviews', interviews.listInterviews)
// app.get('/interviews/create', interviews.createInterview)
// app.get('/interviews/update', interviews.updateInterview)
// app.get('/interviews/delete', interviews.deleteInterview)

// app.get("/profiles", profiles.listProfiles)
// app.get("/profiles/create", profiles.createProfile)
// app.get("/profiles/update/:id", profiles.updateProfile)
// app.get("/profiles/delete/:id", profiles.deleteProfile)

// app.get("/clients", clients.listClients)
// app.get("/clients/create", clients.createClient)
// app.get("/clients/update/:id", clients.updateClient)
// app.get("/clients/delete/:id", clients.deleteClient)

// app.get("/positions", positions.listPositions)
// app.get("/positions/create", positions.createPosition)
// app.get("/positions/remove", positions.deletePosition)
// app.get("/positions/update", positions.updatePosition)

// app.get("/applications", applications.listApplication)
// app.get("/applications/create", applications.createApplication)
// app.get("/applications/delete", applications.deleteApplication)

// app.get("/psychologists", psychologists.getPsychologists)
// app.get("/psychologists/create", psychologists.createPsychologist)
// app.get("/psychologists/delete", psychologists.deletePsychologist)
// app.get("/psychologists/update", psychologists.updatePsychologist)

// app.get('/admins', admins.getAdmins)
// app.get('/admins/update/:id', admins.updateAdmin)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))