const fs = require('fs')
const Positions = require('../data/positions.json')

const createPosition = (req, res) => {
  const newPosition =
    {
      //idPosition: new Date().getTime().toString(),
      idPosition: req.query.idPosition,
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

const updatePosition = (req, res) => {
  const positionToUpdate = req.query.idPosition
  for (const position of Positions) {
    if(position.idPosition === positionToUpdate){
      position.idClient = req.query.idClient,
      position.jobDescription = req.query.jobDescription,
      position.vacancy = req.query.vacancy,
      position.professionalProfiles = req.query.professionalProfiles,
      position.status = req.query.status
    }
    res.send(position)
  }
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
    if (err) throw err
  })
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