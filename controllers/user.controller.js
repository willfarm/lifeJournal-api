const User = require("../models/user.model.js");
const Reset = require("../models/reset.model.js");
const tokenService = require('./token');
const nodemailer = require("nodemailer");
const uuidv1 = require("uuidv1");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }
  // Create a User
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    lastUpdated: Date.now(),
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err || "no error");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.auth = (req, res) => {
  let { email, password } = req.body
  console.log(req.body)
  User.findOne({ email: email }, (err, user) => {
    console.log("User Found =======================================");
    if (err) {
      console.log("error finding user");
      res.json(err);
    }
    if (user) {
      user.comparePassword(password).then(isMatch => {
        if (isMatch) {
          res.json(user);
        } else {
          console.log("Credentials wrong");
        res.status(404).send({
          message: "Incorrect Credentials",
        });
        }
      })
    } else {
      let user = new User({
        email,
        password
      });
      user.save()
      .then(user => {
       res.status(200).send({
         user
       })
      })
      .catch(e => {
        res.status(400).send({
          message: "Error Creating user",
          error: err
        })
      });
    }

    
  });
};

exports.authenticateWithApple = (req, res) => {
  const {token, email, apple_id} = req.body
  User.findOne({appleId: apple_id}, (err, user) => {
    if (err) {
      res.status(401).send(err.message);
    } else if (!isEmpty(user)) {
      if (email && email !== user.email) {
        user.update({email: email})
        user.email = req.body.email;
      }
      res.status(200).send(user);
    } else {
      tokenService.verify(req.body, (err) => {
        if (err) {
          res.status(401).send(err.message);
        } else {
          const user = new User({
            email, apple_id
          });
          // Save User in the database
          user
            .save()
            .then((err, success) => {
              if (err) {
                res.status(401).send(err.message);
              } else {
                res.status(200).send(registeredUser);
              }
            })
        }
      });
    }
  })
}

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message:
            "User not found with userId " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "User not found with userId " + req.params.userId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving user with userId " + req.params.userId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.user) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }
  console.log(req.body.clinicName);
  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      clinicName: req.body.clinicName,
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
      lastUpdated: Date.now(),
    },
    { new: true }
  )
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.userId,
      });
    });
};

exports.forgot = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    if (user) {
      const id = uuidv1();
      const request = {
        id,
        email: user.email,
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
        to: user.email,
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
      User.findOne({ email: reset.email }).then((user) => {
        if (user) {
          user.password = req.body.password;
          user
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err || "no error");
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the User.",
              });
            });
        }
      });
      return res.status(200);
    }
  });
};
