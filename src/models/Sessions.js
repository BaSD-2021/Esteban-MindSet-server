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
      enum: ['cancelled', 'assigned', 'successful'],
      default: 'assigned',
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/,
    },
    notes: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Sessions', SessionSchema);
