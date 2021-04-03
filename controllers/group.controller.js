const Group = require("../models/group.model.js");

exports.getGroups = (req, res) => {
    Group.find()
      .then((groups) => {
        if (!groups) {
          return res.status(400).send({
            message: "No Groups Found",
          });
        }
        return res.status(200).send(groups);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          message: err,
        });
      });
  };

  exports.createGroup = (req, res) => {
    var group = new Group(req.body)
    group.save().then((data) => {
        res.status(200).send(data)
    }).catch(err => res.status(400).send(err))
  }