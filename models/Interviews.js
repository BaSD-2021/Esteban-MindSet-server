const mongoose = require('mongoose');

const { Schema } = mongoose;

const InterviewSchema = new Schema({
  idPostulant: { type: String, required: true },
  idClient: { type: String, required: true },
  idApplication: { type: String, required: true },

  // idPostulant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Postulants',
  // },
  // idClient: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Clients',
  // },
  // idApplication: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Applications',
  // },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Interviews', InterviewSchema);
