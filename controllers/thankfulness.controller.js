const User = require("../models/user.model.js");
const Thankfulness = require("../models/thankfulness.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Thankfulness content can not be empty",
      });
    }
    // Create a thankfulness
    const thankfulness = new Thankfulness(req.body);
    // Save thankfulness in the database
    thankfulness
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

  exports.getThankfulness = (req, res) => {
    let uid = req.params.uid

    Thankfulness.find({user : uid}).then((thankfulnesss) => {
      if (!thankfulnesss) {
        return res.status(400).send({
          message: "No Thankfulness Found"
        })
      }
      return res.status(200).send(thankfulnesss)
    }).catch((err) => {
      console.log(err)
      return res.status(400).send({
        message: err
      })
    })
  }