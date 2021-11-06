const fs = require('fs')
const Sessions = require('../data/sessions.json')

const createSession = (req, res) => {

    const newSession = {
        idSession: req.query.idSession,
        idPsicologist: req.query.idPsicologist,
        idPostulant: req.query.idPostulant,

    }

    Sessions.push(newSession)



    fs.writeFile('./data/sessions.json', JSON.stringify(Sessions), {}, (error) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(201).json(newSession)
        }

    }
    )
}
// Here we have to put the functions that we want to export
module.exports = {
    createSession,

}






