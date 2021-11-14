const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostulantSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactRange: {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
    },
    address: { type: String, required: true },
    birthday: { type: Date, required: true },
    available: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    profiles: [{
      profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profiles',
      },
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
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String, required: true },
        institute: { type: String, required: true },
      }],
      universityStudies: [{
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String, required: true },
        institute: { type: String, required: true },
      }],
      informalStudies: [{
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String, required: true },
        institute: { type: String, required: true },
      }],
    },
    workExperience: [{
      company: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String, required: true },
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Postulants', PostulantSchema);
