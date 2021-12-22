const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationsSchema = new Schema(
  {
    positions: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Positions',
    },
    postulants: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Postulants',
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interviews',
    },
    result: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Applications', ApplicationsSchema);
