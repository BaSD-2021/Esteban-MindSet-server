const express = require('express');
const profiles = require('./controllers/profiles')
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/profiles/add', profiles.createProfile)

app.get('/profiles/update/:id', profiles.updateProfile)

app.get('/profiles/remove/:id', profiles.removeProfile)

app.get('/profiles', profiles.listProfiles)


app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
