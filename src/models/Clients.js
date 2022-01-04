const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  logo: String,
  description: String,
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Clients', ClientsSchema);
