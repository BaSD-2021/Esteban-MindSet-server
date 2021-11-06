const fs = require('fs')
const Positions = require('../data/positions.json')

const createPosition = (req, res) => {
  const newPosition =
    {
      idPosition: new Date().getTime().toString(),
      idClient: req.query.idClient,
      jobDescription: req.query.jobDescription,
      vacancy: req.query.vacancy,
      professionalProfiles: req.query.professionalProfiles,
      status: req.query.status
    }
    Positions.push(newPosition)
    fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
      if (err) throw err
    })
    res.send('create position')
}

const updatePosition = () => {
  
}

const removePosition = (req, res) => {

}

const listPositions = (req, res) => {
  fs.readFile('./data/positions.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(JSON.parse(data))
  });
}


module.exports = {
  createPosition,
  updatePosition,
  removePosition,
  listPositions
}



//localhost:4000/positions/create?idSession=1&idClient=1&jobDescription=Treasury Expert&vacancy=3&professionalProfiles[]=Treasury Expert&professionalProfiles[]=Treasury&status=open