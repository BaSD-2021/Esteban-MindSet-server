const mongoose = require('mongoose');

const { Schema } = mongoose;

const availabilityDaySchema = new Schema({
  availability: {
    type: Boolean,
    required: true,
  },
  from: {
    type: Number,
    default: 1000,
  },
  to: {
    type: Number,
    default: 1800,
  },
}, { _id: false });

const availabilitySchema = new Schema({
  monday: {
    type: availabilityDaySchema,
    required: true,
  },
  tuesday: {
    type: availabilityDaySchema,
    required: true,
  },
  wednesday: {
    type: availabilityDaySchema,
    required: true,
  },
  thursday: {
    type: availabilityDaySchema,
    required: true,
  },
  friday: {
    type: availabilityDaySchema,
    required: true,
  },
  saturday: {
    type: availabilityDaySchema,
    required: true,
  },
  sunday: {
    type: availabilityDaySchema,
    required: true,
  },
}, { _id: false });

const PsychologistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    availability: {
      type: availabilitySchema,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: Number,
    address: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Psychologists', PsychologistSchema);
