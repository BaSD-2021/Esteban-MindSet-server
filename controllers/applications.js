const fs = require('fs')
const Applications = require('../data/applications.json')


const createApplication = (req, res) => {

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