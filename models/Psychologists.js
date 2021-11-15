const mongoose = require('mongoose');

const { Schema } = mongoose;

const availabilityDaySchema = new Schema({
  availability: {
    type: Boolean,
    required: true,
  },
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
});

const availabilitySchema = new Schema(
  {
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
  },
);

const PsychologistSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Psychologists', PsychologistSchema);
