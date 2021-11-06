const fs = require('fs')
const Positions = require('../data/positions.json')

const createPosition = (req, res) => {
  const newPosition = {
      id: new Date().getTime().toString(),
      idClient: req.query.idClient,
      jobDescription: req.query.jobDescription,
      vacancy: req.query.vacancy,
      professionalProfiles: req.query.professionalProfiles,
      status: req.query.status
    }
    Positions.push(newPosition)
    fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, err => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(201).json(newPosition)
      }
    })
}

const updatePosition = (req, res) => {
  let updatedPosition
  const updatedPositions =  Positions.map((position) => {
    if(position.id === req.query.id) {
      updatedPosition = {
        id: req.query.id,
        idClient: req.query.idClient,
        jobDescription: req.query.jobDescription || position.jobDescription,
        vacancy: req.query.vacancy || position.vacancy,
        professionalProfiles: req.query.professionalProfiles || position.professionalProfiles,
        status: req.query.status || position.status
      }
      return updatedPosition
    }
    return position
  })
  fs.writeFile('./data/positions.json', JSON.stringify(updatedPositions), {}, err => {
    if(error) {
      res.status(400).send(error)
    } else {
      res.status(201).json(updatedPosition)
    }
  })
}

const removePosition = (req, res) => {
  const filteredPositions = Positions.filter(position => position.id != req.query.id)
  fs.writeFile('./data/positions.json', JSON.stringify(filteredPositions), {}, err => {
    if(err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(filteredPositions)
    }
  })
}

const listPositions = (req, res) => {
  fs.readFile('./data/positions.json', 'utf8', (err, data) => {
    if(err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(JSON.parse(data))
    }
  });
}

module.exports = {
  createPosition,
  updatePosition,
  removePosition,
  listPositions
}