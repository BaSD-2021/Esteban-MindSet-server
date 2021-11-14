const mongoose = require('mongoose');

const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    postulant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Postulants',
    },
    psychologist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Psychologists',
    },
    status: {
      type: String,
      enum: ['cancelled', 'assigned', 'succesful'],
      default: 'assigned',
      required: true,
    },
    date: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

module.exports = { SessionSchema };
