const mongoose = require('mongoose');

const { Schema } = mongoose;

const InterviewSchema = new Schema(
  {
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
      enum: ['successful', 'failed', 'cancelled', 'assigned', 'confirmed'],
      default: 'assigned',
      required: true,
    },
    date: { type: String, required: true, match: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/ },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Interviews', InterviewSchema);
