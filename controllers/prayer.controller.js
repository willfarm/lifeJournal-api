const User = require("../models/user.model.js");
const Prayer = require("../models/prayer.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Prayer content can not be empty",
    });
  }
  // Create a prayer
  const prayer = new Prayer(req.body);
  let userId = req.body.user;

  User.findById(userId)
    .then((user) => {
      user.prayer.push(prayer);
      user.save();
      prayer.save().then((data) => {
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

exports.updatePrayer = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Todo content can not be empty",
    });
  }
  let prayerId = req.params.prayerId;
  console.log(prayerId);

  Prayer.findOneAndUpdate({ _id: prayerId }, req.body)
    .then((prayer) => {
      console.log(prayer);
      if (prayer) {
        return res.status(200).send(prayer);
      } else {
        return res.status(400).send({ message: "can't find prayer" });
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: "can't find prayer" });
    });
};

exports.getPrayer = (req, res) => {
  let uid = req.params.uid;

  Prayer.find({ user: uid })
    .then((prayers) => {
      if (!prayers) {
        return res.status(400).send({
          message: "No Prayer Found",
        });
      }
      return res.status(200).send(prayers);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
};
exports.deletePrayer = (req, res) => {
  let prayerId = req.params.prayerId;

  Prayer.findByIdAndDelete(todoId)
    .then((todo) => {
      res.status(200).send({ message: "prayer deleted" });
    })
    .catch((err) => res.status(400).send({ message: "something went wrong" }));
};
