const User = require("../models/user.model.js");
const TeachingNotes = require("../models/teachingNotes.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "TeachingNotes content can not be empty",
    });
  }
  console.log(req.body);
  const teachingNotes = new TeachingNotes(req.body);

  let userId = req.body.user;
  User.findById(userId)
    .then((user) => {
      user.teachingNotes.push(TeachingNotes);
      user.save();
      TeachingNotes.save().then((data) => {
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

exports.getTeachingNotes = (req, res) => {
  let uid = req.params.uid;

  TeachingNotes.find({ user: uid })
    .then((TeachingNotess) => {
      if (!TeachingNotess) {
        return res.status(400).send({
          message: "No TeachingNotess Found",
        });
      }
      return res.status(200).send(TeachingNotess);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
};
