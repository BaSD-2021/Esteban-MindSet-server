const mongoose = require('mongoose');

const { Schema } = mongoose;

const InterviewSchema = new Schema({
  postulant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Postulants',
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Clients',
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Applications',
  },
  status: {
    type: String,
    enum: ['succesful', 'failed', 'cancelled', 'assigned', 'confirmed'],
    default: 'assigned',
    required: true,
  },
  date: { type: Date, required: true },
  notes: { type: String },
},
{
  timestamps: true,
},
);

module.exports = mongoose.model('Interviews', InterviewSchema);
