const User = require("../models/user.model.js");


exports.getStats = (req, res) => {

 User.find().then((users) => {
     let count = users.length
     let subCount = users.filter(user => user.subscriptionStatus == "subscribed")
     console.log(count)
     res.status(200).send({
         userCount: count,
        usersSubscribed: subCount.length})
 }).catch((err) => {
    console.log(err || "no error");
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  });
};

