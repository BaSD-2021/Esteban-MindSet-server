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
      if (!newSession && err.kind === 'ObjectId' && err.path === '_id') {
        return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
      }
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(newSession);
    },
  );
};

const deleteSession = (req, res) => {
  Sessions.findByIdAndDelete(req.params.id, (err, deletedSession) => {
    if (!deletedSession && err.kind === 'ObjectId' && err.path === '_id') {
      return res.status(404).json({ msg: `The session 'id' (${req.params.id}) given  does not exist.` });
    }
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(204).send();
  });
};

const listSessions = (req, res) => {
  Sessions.find()
    .then((sessions) => {
      res.status(200).json(sessions);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  createSession, listSessions, updateSession, deleteSession,
};
