const express = require('express');
const app = express();
const PORT = 4000;
const sessions = ('./controllers/sessions.js')




app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

//Here we have the sessions
app.get('/sessions', sessions.listSessions)
app.get('/sessions/create', sessions.createSession)
app.get('/sessions/remove', sessions.removeSession)
app.get('/sessions/update', sessions.updateSession)



app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))





