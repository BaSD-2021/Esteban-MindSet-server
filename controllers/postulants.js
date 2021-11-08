const fs = require('fs')
const Postulants = require("../data/postulants.json")

const getPostulants = (req, res) => {
  res.status(200).json(Postulants)
}

const createPostulant = (req, res) => {
  const params = req.query

  const newPostulant = {
    id: params.id,
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    phone: params.phone,
    address: params.address,
    birthday: params.birthday,
    password: params.password,
    //primary_studies: JSON.parse(req.query.primary_studies),
    //secondary_studies: JSON.parse(req.query.secondary_studies),
    //tertiary_studies: JSON.parse(req.query.tertiary_studies),
    //university_studies: JSON.parse(req.query.university_studies),
    //work_experience: JSON.parse(req.query.work_experience),
    //course: JSON.parse(req.query.course),
    //about: JSON.parse(req.query.about),
    //interview_psy: JSON.parse(req.query.interview_psy),
    //interview_company: JSON.parse(req.query.interview_company)
  }

  Postulants.push(newPostulant)

  fs.writeFile('./data/postulants.json', JSON.stringify(Postulants), {}, (error) => {
    if (error) {
      res.status(400).send(error)
    }
    return res.status(201).json(newPostulant)
  })
}

const deletePostulant = (req, res) => {
  const params = req.query
  const filteredPostulants = Postulants.filter(postulant => postulant.id !== params.id)

  fs.writeFile('./data/postulants.json', JSON.stringify(filteredPostulants), {}, (error) => {
    if (error) {
      res.status(400).send(error)
    }
    return res.status(201).json(filteredPostulants)
  })
}

const updatePostulants = (req, res) => {
}

module.exports = {
  getPostulants,
  createPostulant,
  deletePostulant
}