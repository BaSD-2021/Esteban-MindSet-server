const Positions = require('../models/Positions');

const listPositions = (req, res) => {
  Positions.find(req.query).populate('client', 'name').populate('professionalProfiles', 'name')
    .then((positions) => res.status(200).json({
      message: 'List of positions:',
      data: positions,
    }))
    .catch((error) => res.status(400).json({ message: error }));
};

const createPosition = (req, res) => {
  const positionCreated = new Positions({
    client: req.body.client,
    jobDescription: req.body.jobDescription,
    vacancy: req.body.vacancy,
    professionalProfiles: req.body.professionalProfiles,
    isOpen: req.body.isOpen,
  });

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
      jobDescription: req.body.jobDescription,
      vacancy: req.body.vacancy,
      professionalProfiles: req.body.professionalProfiles,
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
  );
};

const deletePosition = (req, res) => {
  Positions.findByIdAndDelete(req.params.id, (error) => {
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
