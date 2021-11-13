const Positions = require('../models/Positions')

const listPositions = (req, res) => {
  Positions.find().
  then((positions) => {
    return res.status(200).json(positions)
  })
  .catch((error) => {
    return res.status(400).json(error)
  })
}

const updatePosition = (req, res) => {
  Positions.findByIdAndUpdate(req.params.id,
    {
      jobDescription: req.body.jobDescription,
      vacancy: req.body.vacancy,
      professionalProfiles: req.body.professionalProfiles,
      isOpen: req.body.isOpen,
    },
    {new: true},
    (error, newPosition) => {
      if (!newPosition) {
        return res.status(400).json({ msg: `Position with id: ${req.params.id} was not found` })
      }   
      if(error){
        return res.status(400).json(error)
      }
      return res.status(200).json({msg: 'Position updated', newPosition})
    }   
  )
}

const createPosition = (req, res) => {
  const position = new Positions({
    idClient: req.body.idClient,
    jobDescription: req.body.jobDescription,
    vacancy: req.body.vacancy,
    professionalProfiles: req.body.professionalProfiles,
    isOpen: req.body.isOpen
  })

  position.save((error, position) => {
    if(error){
      return res.status(400).json(error)
    }
    return res.status(201).json(position)
  })
}

module.exports = {
  createPosition,
  updatePosition,
  // deletePosition,
  listPositions
}