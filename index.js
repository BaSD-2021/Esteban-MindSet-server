const express = require('express');
const psychologists = require('./controllers/psychologists.js')
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/psychologists', psychologists.getPsychologists)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))