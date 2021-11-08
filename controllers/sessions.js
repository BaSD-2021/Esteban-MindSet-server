const fs = require('fs')
const Sessions = require('../data/sessions.json')

const listSession = (req, res) => {
    res.status(200).json(Sessions)
}

const createSession = (req, res) => {
    const newSession = {
        idSession: req.query.idSession,
        idPsicologist: req.query.idPsicologist,
        idPostulant: req.query.idPostulant,
        date: req.query.date,
        state: req.query.state,
    }
    Sessions.push(newSession)
    fs.writeFile('./data/sessions.json', JSON.stringify(Sessions), {}, (error) => {
        if (error) {
            return res.status(400).send(error)
        }
        return res.status(201).json(newSession)
    })
}

const updateSession = (req, res) => {
    let updatedSession
    const updatedSessions = Sessions.map((session) => {
        if (session.idSession == req.query.idSession) {
            updatedSession = {
                idSession: req.query.idSession,
                idPsicologist: req.query.idPsicologist,
                idPostulant: req.query.idPostulant,
                date: req.query.date || session.date,
                state: req.query.state || session.state
            }
            return updatedSession
        }
        return session
    })
    if (!updatedSession) res.status(404).send('Session NOT found')
    fs.writeFile('./data/sessions.json', JSON.stringify(updatedSessions), {}, (error) => {
        if (error) {
            return res.status(400).send(error)
        }
        return res.status(201).json(updatedSession)
    })
}

const deleteSession = (req, res) => {
    const filteredSessions = Sessions.filter(session => session.idSession != req.query.idSession)
    const deletedSession = Sessions.filter(session => session.idSession == req.query.idSession)
    if (deletedSession.length === 0) res.status(404).send('Session NOT found')
    fs.writeFile('./data/sessions.json', JSON.stringify(filteredSessions), {}, (error) => {
        if (error) {
            return res.status(400).send(error)
        }
        return res.status(201).json(deletedSession)
    })
}

module.exports = {
    createSession, listSession, updateSession, deleteSession,
}