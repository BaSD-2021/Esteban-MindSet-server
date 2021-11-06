const fs = require('fs')
const Positions = require('../data/positions.json')

/** Description. takes params: idClient, jobDescription, vacancy, professionalProfiles and status. ID is generated automatically*/
const createPosition = (req, res) => {
  const newPosition =
    {
      id: new Date().getTime().toString(),
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
    res.send('created position')
}

/** Description. takes params: id (this is the id you want to update) , idClient, jobDescription, vacancy, professionalProfiles and status.*/
const updatePosition = (req, res) => {
  const positionIdToUpdate = req.query.id
  for (const position in Positions) {
    if(Positions[position].id == positionIdToUpdate){
      Positions[position].idClient = req.query.idClient,
      Positions[position].jobDescription = req.query.jobDescription,
      Positions[position].vacancy = req.query.vacancy,
      Positions[position].professionalProfiles = req.query.professionalProfiles,
      Positions[position].status = req.query.status
      res.send(`updated position id:${positionIdToUpdate}`)
      break //there should be just 1 position to update, each is unique
    }
  }
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
    if (err) throw err
  })
}

/** Description. takes param id and removes it*/
const removePosition = (req, res) => {
  const positionToRemove = req.query.id
  for (const position in Positions) {
    if(Positions[position].id == positionToRemove){
      Positions.splice(position, 1)
      break //there should be just 1 position to update, each is unique
    }
  }
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
    if (err) throw err
  })
  res.send(`removed position id:${positionToRemove}`)
}

/** Description. takes no params, shows all positions*/
const listPositions = (req, res) => {
  fs.readFile('./data/positions.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data))
  });
}

module.exports = {
  createPosition,
  updatePosition,
  removePosition,
  listPositions
}