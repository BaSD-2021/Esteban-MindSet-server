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

  if(updatedPosition === undefined) {
    res.status(404).send('position not found')
  } else if (JSON.stringify(updatedPositions) === JSON.stringify(Positions)){
    res.status(201).send('position found but not changed')
  }

  fs.writeFile('./data/positions.json', JSON.stringify(updatedPositions), {}, err => {
    if(err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(updatedPosition)
    }
  })
}

const deletePosition = (req, res) => {
  const filteredPositions = Positions.filter(position => position.id !== req.query.id)
  const removedPosition = Positions.filter(position => position.id === req.query.id) 
  console.log(removedPosition)
  if(removedPosition.length === 0) res.status(404).send('Position not found')
  fs.writeFile('./data/positions.json', JSON.stringify(filteredPositions), {}, err => {
    if(err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(removedPosition)
    }
  })
}

const listPositions = (req, res) => res.status(200).json(Positions)


module.exports = {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions
}