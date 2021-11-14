const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationsSchema = new Schema({
  // id: Schema.Types.ObjectId,
  positions: { type: String, required: true },
  postulants: { type: String, required: true },
  interview: String,
  result: { type: String, required: true },
});

module.exports = mongoose.model('Applications', ApplicationsSchema);
