const Provider = require("../models/provider.model.js");
const Reset = require("../models/reset.model.js");
const nodemailer = require("nodemailer");
const uuidv1 = require("uuidv1");

// Create and Save a new provider
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "provider content can not be empty",
    });
  }

  // Create a Provider
  const provider = new Provider({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    clinicName: req.body.clinicName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    beds: req.body.beds,
    patients: req.body.patients,
    insurance: req.body.insurance,
    english: req.body.english,
    spanish: req.body.spanish,
    am: req.body.am,
    pm: req.body.pm,
    inPatient: req.body.inPatient,
    outPatient: req.body.outPatient,
    lastUpdated: Date.now,
  });

  // Save Provider in the database
  provider
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err || "no error");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider.",
      });
    });
};

// Retrieve and return all providers from the database.
exports.findAll = (req, res) => {
  Provider.find()
    .then((providers) => {
      res.send(providers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers.",
      });
    });
};

exports.auth = (req, res) => {
  Provider.findOne({ phoneNumber: req.body.phoneNumber }, (err, user) => {
    console.log("Provider Found =======================================");
    if (err) {
      console.log("error finding provider");
      res.json(err);
    }
    console.log(user.password);
    console.log(req.body.password);
    if (user && user.password === req.body.password) {
      console.log("User and password is correct");
      res.json(user);
    } else {
      console.log("Credentials wrong");
      res.status(404).send({
        message: "Login Invalid",
      });
    }
  });
};

// Find a single provider with a providerId
exports.findOne = (req, res) => {
  Provider.findById(req.params.providerId)
    .then((provider) => {
      if (!provider) {
        return res.status(401).send({
          message:
            "Provider not found with providerId " + req.params.providerId,
        });
      }
      res.send(provider);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Provider not found with providerId " + req.params.providerId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving provider with providerId " + req.params.providerId,
      });
    });
};

// Update a provider identified by the providerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.provider) {
    return res.status(400).send({
      message: "provider content can not be empty",
    });
  }
  console.log(req.body);
  // Find provider and update it with the request body
  Provider.findByIdAndUpdate(
    req.params.providerId,
    {
      name: req.body.name,
      clinic: req.body.clinic,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      beds: req.body.beds,
      patients: req.body.patients,
      insurance: req.body.insurance,
      english: req.body.english,
      spanish: req.body.spanish,
      am: req.body.am,
      pm: req.body.pm,
      inPatient: req.body.inPatient,
      outPatient: req.body.outPatient,
      lastUpdated: Date.now,
    },
    { new: true }
  )
    .then((provider) => {
      if (!provider) {
        return res.status(404).send({
          message: "provider not found with id " + req.params.providerId,
        });
      }
      res.send(provider);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Provider not found with id " + req.params.providerId,
        });
      }
      return res.status(500).send({
        message: "Error updating provider with id " + req.params.providerId,
      });
    });
};

// Delete a provider with the specified providerId in the request
exports.delete = (req, res) => {
  Provider.findByIdAndRemove(req.params.providerId)
    .then((provider) => {
      if (!provider) {
        return res.status(404).send({
          message: "Provider not found with id " + req.params.providerId,
        });
      }
      res.send({ message: "Provider deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "provider not found with id " + req.params.providerId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Provider with id " + req.params.providerId,
      });
    });
};

exports.forgot = (req, res) => {
  console.log(req.body);
  Provider.findOne({ email: req.body.email }).then((provider) => {
    console.log(provider);
    if (provider) {
      const id = uuidv1();
      const request = {
        id,
        email: provider.email,
      };
      const reset = new Reset(request);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "noreply.elivehealth@gmail.com",
          pass: "1234qwer!@#$QWER",
        },
      });

      let mailOptions = {
        from: "noreply.eliveheath@gmail.com",
        to: provider.email,
        subject: "Elive Forgot Password",
        text: `To reset your password, please click on this link: http://elive-web.herokuapp.com/reset/${id}`,
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
        }
      });
    }
    return res.status(200).json();
  });
};

exports.reset = (req, res) => {
  Reset.findOne({ id: req.body.id }).then((reset) => {
    if (!reset) {
      return res.status(404).send({
        message: "invalid id",
      });
    } else {
      Provider.findOne({ email: reset.email }).then((provider) => {
        if (provider) {
          provider.password = req.body.password;
          provider
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err || "no error");
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the Provider.",
              });
            });
        }
      });
      return res.status(200);
    }
  });
};
