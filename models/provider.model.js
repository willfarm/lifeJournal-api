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
    required: true,
  },
  patients: {
    type: String,
    required: true,
  },
  insurance: {
    type: [String],
    required: true,
  },
  inPatient: {
    type: Boolean,
    required: true,
  },
  outPatient: {
    type: Boolean,
    required: true,
  },
  am: {
    type: Boolean,
    required: true,
  },
  pm: {
    type: Boolean,
    required: true,
  },
  english: {
    type: Boolean,
    required: true,
  },
  spanish: {
    type: Boolean,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Provider", ProviderSchema);
