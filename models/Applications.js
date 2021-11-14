const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationsSchema = new Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    positions: { type: String, required: true },
    postulants: { type: String, required: true },
    interview: { type: String },
    result: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Applications', ApplicationsSchema);
