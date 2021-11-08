const fs = require('fs')
const { builtinModules } = require('module')
const Interviews = require('../data/interviews.json')

const listInterviews = () => {
    res.status(201).json(Interviews)
}




modules.export = {
    listInterviews,
}