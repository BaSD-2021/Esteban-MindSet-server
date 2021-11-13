const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationsSchema = new Schema({
    idPositions: { type: String, require: true },
    idPostulants: { type: String, require: true },
    idInterview: { type: String, require: false },
    result: { type: String, require: true }
})

module.exports = mongoose.model("Applications", ApplicationsSchema)