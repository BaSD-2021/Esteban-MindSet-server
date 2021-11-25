const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// eslint-disable-next-line eol-last
module.exports = mongoose.model('Admin', AdminSchema);