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
    let userId = req.body.user

    User.findById(userId).then((user) => {
    
     user.thankfulness.push(thankfulness)
     user.save()
     thankfulness
       .save()
       .then((data) => {
         res.send(data);
       })
       
    })
    .catch((err) => {
      console.log(err || "no error");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
  };

  exports.updateThankfulness = (req, res) => {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "thankfulness content can not be empty",
      });
    }
    let thankfulnessId = req.params.thankfulnessId;
  
    Thankfulness.findOneAndUpdate({ _id: thankfulnessId }, req.body)
      .then((thankfulness) => {
        if (!thankfulness) {
          return res.status(400).send({ message: "can't find thankfulness" });
        } else {
          return res.status(200).send(thankfulness);
        }
      })
      .catch((err) => {
        return res.status(400).send({ message: "can't find thankfulness" });
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
      return res.status(200).send(thankfulnesss.reverse())
    }).catch((err) => {
      console.log(err)
      return res.status(400).send({
        message: err
      })
    })
  }