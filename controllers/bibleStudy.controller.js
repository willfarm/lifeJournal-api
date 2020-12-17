const User = require("../models/user.model.js");
const BibleStudy = require("../models/bibleStudy.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "BibleStudy content can not be empty",
    });
  }
  console.log(req.body);
  const bibleStudy = new BibleStudy(req.body);

  let userId = req.body.user;
  User.findById(userId)
    .then((user) => {
      user.bibleStudy.push(bibleStudy);
      user.save();
      bibleStudy.save().then((data) => {
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err || "no error");
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.getBibleStudy = (req, res) => {
  let uid = req.params.uid;

  BibleStudy.find({ user: uid })
    .then((bibleStudies) => {
      if (!bibleStudies) {
        return res.status(400).send({
          message: "No BibleStudys Found",
        });
      }
      return res.status(200).send(bibleStudies);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
};
