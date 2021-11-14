<<<<<<< HEAD
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
    client: req.body.client,
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

const deletePosition = (req, res) => {
  Positions.findByIdAndDelete(req.params.id, (error) => {
    if(error){
      res.status(400).json(error)
    }
    res.status(200).json(`Position with id ${req.params.id} was removed`)
  })
}
=======
const fs = require('fs');
const Positions = require('../data/positions.json');

const createPosition = (req, res) => {
  const newPosition = {
    id: new Date().getTime().toString(),
    idClient: req.query.idClient,
    jobDescription: req.query.jobDescription,
    vacancy: req.query.vacancy,
    professionalProfiles: req.query.professionalProfiles,
    status: req.query.status,
  };
  Positions.push(newPosition);
  fs.writeFile('./data/positions.json', JSON.stringify(Positions), {}, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(201).json(newPosition);
  });
};

const updatePosition = (req, res) => {
  let updatedPosition;
  const updatedPositions = Positions.map((position) => {
    if (position.id === req.query.id) {
      updatedPosition = {
        id: req.query.id,
        idClient: req.query.idClient,
        jobDescription: req.query.jobDescription || position.jobDescription,
        vacancy: req.query.vacancy || position.vacancy,
        professionalProfiles: req.query.professionalProfiles || position.professionalProfiles,
        status: req.query.status || position.status,
      };
      return updatedPosition;
    }
    return position;
  });

  if (!updatedPosition) {
    return res.status(404).send('position not found');
  }
  if (JSON.stringify(updatedPositions) === JSON.stringify(Positions)) {
    return res.status(200).send('position found but not changed');
  }

  return fs.writeFile('./data/positions.json', JSON.stringify(updatedPositions), {}, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json(updatedPosition);
  });
};

const deletePosition = (req, res) => {
  let removedPosition;
  const filteredPositions = Positions.filter((app) => {
    if (app.id === req.query.id) {
      removedPosition = app;
      return false;
    }
    return true;
  });

  if (!removedPosition.length) {
    return res.status(404).send('Position not found');
  }

  return fs.writeFile('./data/positions.json', JSON.stringify(filteredPositions), {}, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(204).json(removedPosition);
  });
};

const listPositions = (req, res) => res.status(200).json(Positions);
>>>>>>> origin/development

module.exports = {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions,
};
