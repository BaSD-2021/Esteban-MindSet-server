const interviews = require('./controllers/interviews')
const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/interviews', interviews.listInterviews)
app.get('/interviews/create', interviews.createInterview)
app.get('/interviews/update', interviews.updateInterview)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))