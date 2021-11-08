const express = require('express');
const positions = require('./controllers/positions.js')
const app = express();
const PORT = 4000;


app.get('/', (req, res) => {
    res.send('La Bestia does the best readmes ever');
})

app.get('/positions', positions.listPositions)
app.get('/positions/create', positions.createPosition)
app.get('/positions/remove', positions.deletePosition)
app.get('/positions/update', positions.updatePosition)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))