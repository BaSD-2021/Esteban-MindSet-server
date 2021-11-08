const fs = require('fs')
const Interviews = require('../data/interviews.json')

const listInterviews = () => {
    res.status(201).json(Interviews)
}

const createInterview = (req, res) => {
    const newInterview = {
        id: req.query.id,
        idClient: req.query.idClient,
        idPostulant: req.query.idPostulant,
        idApplication: req.query.idApplication,
        date: req.query.date
    }
    Interviews.push(newInterview)

    fs.writeFile('./data/interviews.json', JSON.stringify(Interviews), {}, (error) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(201).send(newInterview)
        }


    })
}


module.exports = {
    listInterviews, createInterview,
}