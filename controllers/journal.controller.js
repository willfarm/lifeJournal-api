const User = require("../models/user.model.js");
const Journal = require("../models/journal.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Journal content can not be empty",
      });
    }
    // Create a journal
    const journal = new Journal(req.body);
    // Save journal in the database
    journal
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

  exports.getJournals = (req, res) => {
    let uid = req.params.uid

    Journal.find({user : uid}).then((journals) => {
      if (!journals) {
        return res.status(400).send({
          message: "No Journals Found"
        })
      }
      return res.status(200).send(journals)
    }).catch((err) => {
      console.log(err)
      return res.status(400).send({
        message: err
      })
    })
  }