const sessions = require('./controllers/sessions')
const express = require('express');
const app = express();
const PORT = 4000;


app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})


app.get('/sessions', sessions.listSession)
app.get('/sessions/create', sessions.createSession)
app.get('/sessions/remove', sessions.removeSession)
app.get('/sessions/update', sessions.updateSession)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))