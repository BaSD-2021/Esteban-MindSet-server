const mongoose = require('mongoose');

const { Schema } = mongoose;

const profilesSchema = new Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Profiles', profilesSchema);
