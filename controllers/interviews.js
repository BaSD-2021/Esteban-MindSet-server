const fs = require('fs')
const Interviews = require('../data/interviews.json')

const listInterviews = (req, res) => {
    res.status(200).json(Interviews)
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
            return res.status(400).send(error)
        }
        return res.status(201).send(newInterview)
    })
}

const updateInterview = (req, res) => {
    let updatedInterview
    const updatedInterviews = Interviews.map((interview) => {
        if (interview.id == req.query.id) {
            updatedInterview = {
                id: req.query.id,
                idClient: req.query.idClient || interview.idClient,
                idPostulant: req.query.idPostulant || interview.idPostulant,
                idApplication: req.query.idApplication || interview.idApplication,
                date: req.query.date || interview.date,
            }
            return updatedInterview
        }
        return interview
    })
    if (!updateInterview) res.status(404).send('Interview NOT found')
    fs.writeFile('./data/interviews.json', JSON.stringify(updatedInterviews), {}, (error) => {
        if (error) {
            return res.status(400).send(error)
        }
        return res.status(201).send(updatedInterview)
    })
}

const deleteInterview = (req, res) => {
    let removeInterview
    const filteredInterview = Interviews.filter((interview) => {
        if (interview.id === req.query.id) {
            removeInterview = interview
            return false
        }
        return true
    })
    if (!removeInterview) {
        return res.status(404).send('Interview NOT found')
    }
    fs.writeFile('./data/interviews.json', JSON.stringify(filteredInterview), {}, (error) => {
        if (error) {
            return res.status(400).send(error)
        }
        return res.status(201).send(removeInterview)
    })
}

module.exports = {
    listInterviews, createInterview, updateInterview, deleteInterview
}