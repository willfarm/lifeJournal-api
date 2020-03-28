const Provider = require('../models/provider.model.js');

// Create and Save a new provider
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "provider content can not be empty"
        });
    }

    // Create a Provider
    const provider = new Provider({
        name: req.body.name,
        password: req.body.password,
        clinicName: req.body.clinicName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        beds: req.body.beds,
        patients: req.body.patients,
        insurance: req.body.insurance,
    })


    // Save Provider in the database
    provider.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err || "no error");
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Provider."
        });
    });
};

// Retrieve and return all providers from the database.
exports.findAll = (req, res) => {
    Provider.find()
    .then(providers => {
        res.send(providers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving providers."
        });
    });
};

exports.auth = (req, res) => {
    console.log(req);
    Provider.findOne({ phoneNumber: req.body.phoneNumber}, (err, user) => {
        console.log('Provider Found =======================================')
        if (err) {
            console.log('error finding provider')
            res.json(err)
        }
        if (user && user.password === req.body.password){
          console.log('User and password is correct')
          res.json(user);
        } else {
          console.log("Credentials wrong");
          res.json({data: "Login invalid"});
        }
    })
}

// Find a single provider with a providerId
exports.findOne = (req, res) => {
    Provider.findById(req.params.providerId)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with providerId " + req.params.providerId
            });            
        }
        res.send(provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with providerId " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving provider with providerId " + req.params.providerId
        });
    });
};

// Update a provider identified by the providerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "provider content can not be empty"
        });
    }

    // Find provider and update it with the request body
    Provider.findByIdAndUpdate(req.params.providerId, {
        name: req.body.name,
        password: req.body.password,
        clinic: req.body.clinic,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        beds: req.body.beds,
        patients: req.body.patients,
        insurance: req.body.insurance,
        lastUpdated: Date.now,
     }, {new: true})
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "provider not found with id " + req.params.providerId
            });
        }
        res.send(provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Error updating provider with id " + req.params.providerId
        });
    });
};

// Delete a provider with the specified providerId in the request
exports.delete = (req, res) => {
    Provider.findByIdAndRemove(req.params.providerId)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });
        }
        res.send({message: "Provider deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Provider with id " + req.params.providerId
        });
    });
};
