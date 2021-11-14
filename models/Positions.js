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
  professionalProfiles: [{ type: String, required: true }],
  isOpen: { type: Boolean, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Positions', PositionsSchema);
