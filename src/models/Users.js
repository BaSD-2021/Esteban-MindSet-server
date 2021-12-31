const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firebaseUid: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model('Users', UsersSchema);
