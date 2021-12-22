const mongoose = require('mongoose');

const { Schema } = mongoose;

const profilesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Profiles', profilesSchema);
