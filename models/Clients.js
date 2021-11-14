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
  created: {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    timestamp: Date,
  },
  modified: {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admins' },
    timestamp: Date,
  },
  timestamp: true
});

module.exports = mongoose.model('Clients', ClientsSchema);
