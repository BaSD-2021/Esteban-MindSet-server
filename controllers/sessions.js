const Sessions = require('../models/Sessions');

const listSessions = (req, res) => {
  Sessions.find(req.query)
    .then((sessions) => {
      res.status(200).json(sessions);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

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
      return res.status(400).json({ message: err.message });
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
        return res.status(400).json({ message: err.message });
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
      return res.status(400).json({ message: err.message });
    }
    if (!deletedSession) {
      return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(204).send(deletedSession);
  });
};

module.exports = {
  createSession, listSessions, updateSession, deleteSession,
};
