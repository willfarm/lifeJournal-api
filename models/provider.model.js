const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clinicName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  beds: {
    type: String,
    required: false,
  },
  patients: {
    type: String,
    required: false,
  },
  insurance: {
    type: [String],
    required: false,
  },
  inPatient: {
    type: Boolean,
    required: false,
  },
  outPatient: {
    type: Boolean,
    required: false,
  },
  am: {
    type: Boolean,
    required: false,
  },
  pm: {
    type: Boolean,
    required: false,
  },
  english: {
    type: Boolean,
    required: false,
  },
  spanish: {
    type: Boolean,
    required: false,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Provider", ProviderSchema);
