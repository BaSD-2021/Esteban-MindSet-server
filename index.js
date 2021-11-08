const express = require('express');
const applications = require('./controllers/applications')
const psychologists = require('./controllers/psychologists.js')
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/applications', applications.listApplication) 
app.get('/applications/create', applications.createApplication) 
app.get('/applications/delete', applications.deleteApplication) 

app.get('/psychologists', psychologists.getPsychologists)
app.get('/psychologists/create', psychologists.createPsychologist)
app.get('/psychologists/delete', psychologists.deletePsychologist)
app.get('/psychologists/update', psychologists.updatePsychologist)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
