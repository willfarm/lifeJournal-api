const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
	  name: {
    	type: String,
    	required: true
  	},
  	password: {
  		type: String,
  		required: true
  	},
  	clinicName: {
    	type: String,
    	required: true
  	},
  	address: {
    	type: String,
    	required: true
  	},
  	phoneNumber: {
    	type: String,
    	required: true
  	},
  	beds: {
    	type: String,
    	required: true
  	},
  	patients: {
    	type: String,
    	required: true
  	},
  	insurance: {
    	type: String,
    	required: true
  	},
})

module.exports = mongoose.model('Provider', ProviderSchema);