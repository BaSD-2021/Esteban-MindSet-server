const fs = require('fs')
const Applications = require('../data/applications.json')

const createApplication = (req, res) => {
  const newApplication = {
    id: new Date().getTime().toString(),
    idPosition: req.query.idPosition,
    idPostulant: req.query.idPostulant,
    date: req.query.date,
    profile: req.query.profile
  }
  Applications.push(newApplication)
  fs.writeFile('./data/applications.json', JSON.stringify(Applications), {}, err => {
    if (err) {
      return res.status(400).send(err)
    } 
    return res.status(201).send(newApplication)
  })
}

const deleteApplication = (req, res) => {
  let removedApplication
  const filteredApplications = Applications.filter(app => {
    if(app.id === req.query.id) {
      removedApplication = app
      return false
    }
    return true
  })

  if(removedApplication.length === 0) res.status(404).send('application not found')
  fs.writeFile('./data/applications.json', JSON.stringify(filteredApplications), {}, err => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).send(removedApplication)
  }) 
}

const listApplication = (req, res) => res.status(400).json(Applications)

module.exports = {
  createApplication,
  deleteApplication,
  listApplication,
}