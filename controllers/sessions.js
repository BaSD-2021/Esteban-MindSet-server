const Sessions = require('../models/Sessions');

const createSession = (req, res) => {
  const session = new Sessions({
    postulant: req.body.postulant,
    psychologist: req.body.psychologist,
    status: req.body.status,
    date: req.body.date,
    notes: req.body.notes,
  });
  session.save((err, cbSession) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(201).json(cbSession);
  });
};

const updateSession = (req, res) => {
  Sessions.findByIdAndUpdate(
    req.params.id,
    {
      postulant: req.body.postulant,
      psychologist: req.body.psychologist,
      status: req.body.status,
      date: req.body.date,
      notes: req.body.notes,
    },
    { new: true },
    (err, newSession) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (!newSession) {
        return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
      }
      return res.status(200).json(newSession);
    },
  );
};

const deleteSession = (req, res) => {
  Sessions.findByIdAndDelete(req.params.id, (err, deletedSession) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!deletedSession) {
      return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(204).send(deletedSession);
  });
};

const listAllSessions = (req, res) => {
  Sessions.find()
    .then((sessions) => {
      res.status(200).json(sessions);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const listSession = (req, res) => {
  Sessions.findById(req.params.id, (err, foundSession) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!foundSession) {
      return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(200).send(foundSession);
  });
};

module.exports = {
  createSession, listAllSessions, updateSession, deleteSession, listSession,
};
