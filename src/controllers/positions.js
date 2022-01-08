const Positions = require('../models/Positions');

const listPositions = (req, res) => {
  if ('_id' in req.query) {
    Positions.find({ _id: req.query, isDeleted: false }).populate('client', 'name').populate('professionalProfile')
      .then((positions) => res.status(200).json({
        message: 'List of positions:',
        data: positions,
      }))
      .catch((error) => res.status(400).json({ message: error }));
  } else {
    Positions.find({ isDeleted: false }).populate('client', 'name').populate('professionalProfile')
      .then((positions) => res.status(200).json({
        message: 'List of positions:',
        data: positions,
      }))
      .catch((error) => res.status(400).json({ message: error }));
  }
};

const createPosition = (req, res) => {
  const positionCreated = new Positions({
    client: req.body.client,
    jobDescription: req.body.jobDescription,
    vacancy: req.body.vacancy,
    professionalProfile: req.body.professionalProfile,
    isOpen: req.body.isOpen,
  });

  positionCreated.populate('client', 'name');
  positionCreated.populate('professionalProfile');

  positionCreated.save((error, position) => {
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(201).json({
      message: 'Position created',
      data: position,
    });
  });
};

const updatePosition = (req, res) => {
  Positions.findByIdAndUpdate(
    req.params.id,
    {
      client: req.body.client,
      jobDescription: req.body.jobDescription,
      vacancy: req.body.vacancy,
      professionalProfile: req.body.professionalProfile,
      isOpen: req.body.isOpen,
    },
    { new: true },
    (error, newPosition) => {
      if (!newPosition) {
        return res.status(404).json({ message: `Position with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json({ message: error });
      }
      return res.status(200).json({
        message: 'Position updated',
        data: newPosition,
      });
    },
  ).populate('client', 'name').populate('professionalProfile');
};

const deletePosition = (req, res) => {
  Positions.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  }, (error) => {
    if (error) {
      return res.status(404).json({ message: `Position with id ${req.params.id} does not extis` });
    }
    return res.status(204).send();
  });
};
module.exports = {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions,
};
