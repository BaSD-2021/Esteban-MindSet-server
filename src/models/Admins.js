const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  firebaseUid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Admin', AdminSchema);
