const express = require('express');
const psychologists = require('./controllers/psychologists.js')
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

// PSYCHOLOGISTS CONTROLLER
app.get('/psychologists', psychologists.getPsychologists)
app.get('/psychologists/create/', psychologists.createPsychologist)
app.get('/psychologists/delete/', psychologists.deletePsychologist)
app.get('/psychologists/update/', psychologists.updatePsychologist)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))