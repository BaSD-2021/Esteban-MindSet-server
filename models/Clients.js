const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientsSchema = new Schema({
  name: { type: String, required: true, ref: 'Client Name' },
  phone: { type: Number, required: true },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  logo: String,
  description: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Clients', ClientsSchema);
