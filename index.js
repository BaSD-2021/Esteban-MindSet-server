const express = require('express');
const app = express();
const PORT = 4000;
const admins = require('./controllers/admins');

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/admins', admins.getAdmins)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))