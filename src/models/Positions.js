const mongoose = require('mongoose');

const { Schema } = mongoose;

const PositionsSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: true,
  },
  jobDescription: { type: String },
  vacancy: { type: Number },
  professionalProfile:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profiles',
  },
  isOpen: { type: Boolean, required: true },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Positions', PositionsSchema);
