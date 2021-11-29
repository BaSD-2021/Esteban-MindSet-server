const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostulantSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactRange: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    address: { type: String, required: true },
    birthday: { type: Date, required: true },
    available: { type: Boolean },
    phone: { type: Number, required: true },
    profiles: [{
      profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles',
      },
      _id: false,
    }],
    studies: {
      primaryStudies: {
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        school: { type: String, required: true },
      },
      secondaryStudies: {
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        school: { type: String, required: true },
      },
      tertiaryStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
      universityStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
      informalStudies: [{
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        institute: { type: String },
        _id: false,
      }],
    },
    workExperience: [{
      company: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
      _id: false,
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Postulants', PostulantSchema);
