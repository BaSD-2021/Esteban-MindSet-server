const express = require('express');
const applications = require('./controllers/applications')
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))

//PPLICATIONS   
app.get('/applications', applications.listApplication) 
app.get('/applications/create', applications.createApplication) 
app.get('/applications/update', applications.updateApplication) 
app.get('/applications/remove', applications.deleteApplication) 
