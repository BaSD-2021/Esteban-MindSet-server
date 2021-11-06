const fs = require('fs')
const Positions = require('../data/positions.json')

const createPosition = (req, res) => {
  const newPosition =
    {
      // idPosition: new Date().getTime().toString(),
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
  for (const position in Positions) {
    if(Positions[position].idPosition == req.query.idPosition){
      Positions[position].idPosition = req.query.idPosition,
      Positions[position].idClient = req.query.idClient,
      Positions[position].jobDescription = req.query.jobDescription,
      Positions[position].vacancy = req.query.vacancy,
      Positions[position].professionalProfiles = req.query.professionalProfiles,
      Positions[position].status = req.query.status
      console.log('entered if')
      res.send('updated position')
      break
    }
  }
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
    if (err) throw err
  })
}

const removePosition = (req, res) => {
  const positionToRemove = req.query.idPosition
  for (const position in Positions) {
    if(Positions[position].idPosition == positionToRemove){
      Positions.splice(position, 1)
      break
    }
  }
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
    if (err) throw err
  })
}

const listPositions = (req, res) => {
  fs.readFile('./data/positions.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data))
  });
  console.log(Positions)
}

module.exports = {
  createPosition,
  updatePosition,
  removePosition,
  listPositions
}