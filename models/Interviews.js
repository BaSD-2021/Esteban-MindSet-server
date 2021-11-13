const mongoose = require('mongoose');

const { Schema } = mongoose;

const InterviewSchema = new Schema({
  postulant: { type: String, required: true },
  client: { type: String, required: true },
  application: { type: String, required: true },

  // postulant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Postulants',
  // },
  // client: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Clients',
  // },
  // application: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Applications',
  // },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Interviews', InterviewSchema);
