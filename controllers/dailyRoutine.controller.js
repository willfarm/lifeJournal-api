const User = require("../models/user.model.js");
const DailyRoutine = require("../models/dailyRoutine.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "DailyRoutine content can not be empty",
    });
  }
  console.log(req.body);
  const dailyRoutine = new DailyRoutine(req.body);

  let userId = req.body.user;
  User.findById(userId)
    .then((user) => {
      user.dailyRoutine.push(dailyRoutine);
      user.save();
      dailyRoutine.save().then((data) => {
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

exports.updateDailyRoutine = (req, res) => {
  let dailyRoutine = req.body;
  let dailyRoutineId = req.body._id;
  DailyRoutine.findOneAndUpdate({ _id: dailyRoutineId }, { $set: dailyRoutine })
    .then((dailyRoutine) => {
      if (!dailyRoutine) {
        res.status(400).send({ message: "daily routine not found" });
      }
      dailyRoutine.save().then((dailyRoutine) => {
        res.send(dailyRoutine);
      });
    })
    .catch((err) =>
      res.status(400).send({ message: "update not completed", error: err })
    );
};

exports.falseAllDailyRoutines = (req, res) => {
  let uid = req.params.uid;
  DailyRoutine.updateMany({user: uid}, {done: false}).then((dailyRoutines) => {
    console.log(dailyRoutines)
    res.status(200).send({message: "update completed all false"})
  }).catch(err => res.status(400).send({message: err}))

  
}

exports.getDailyRoutine = (req, res) => {
  let uid = req.params.uid;

  DailyRoutine.find({ user: uid })
    .then((bibleStudies) => {
      if (!bibleStudies) {
        return res.status(400).send({
          message: "No DailyRoutines Found",
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
