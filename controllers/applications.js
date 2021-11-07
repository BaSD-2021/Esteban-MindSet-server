const fs = require('fs')
const Applications = require('../data/applications.json')


const createApplication = (req, res) => {
  const newApplication = {
    id: new Date().getTime().toString(),
    idPosition: req.query.idPosition,
    idPostulant: req.query.idPostulant,
    date: req.query.date
  }
  console.log(newApplication)
  Applications.push(newApplication)
  fs.writeFile('./data/applications.json', JSON.stringify(Applications), {}, err => {
    if (err) {
      return res.status(400).send(err)
    } 
    return res.status(201).send(newApplication)
  })
}

const updateApplication = (req, res) => {

}

const deleteApplication = (req, res) => {

}

const listApplication = (req, res) => res.status(400).json(Applications)

module.exports = {
  createApplication,
  updateApplication,
  deleteApplication,
  listApplication,
}