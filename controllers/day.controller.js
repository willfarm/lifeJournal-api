const User = require("../models/user.model.js");
const BibleStudy = require("../models/bibleStudy.model.js");
const DailyRoutine = require("../models/dailyRoutine.model.js");
const Journal = require("../models/journal.model.js");
const Prayer = require("../models/prayer.model.js");
const Thankfulness = require("../models/thankfulness.model.js");
const Todo = require("../models/todo.model.js");
const TeachingNotes = require("../models/teachingNotes.model.js");

exports.getDayForUser = (req, res) => {
  let uid = req.body.user;
  let dateStart = new Date(req.body.date);
  var day = 60 * 60 * 24 * 1000;
  let dateEnd = new Date(dateStart.getTime() + day);

  console.log(req.body);

  var promises = [];
  promises.push(
    BibleStudy.find({ user: uid, date: { $gte: dateStart, $lt: dateEnd } })
      .lean()
      .exec()
  );
  promises.push(DailyRoutine.find({ user: uid }).lean().exec());
  promises.push(
    Journal.find({ user: uid, date: { $gte: dateStart, $lt: dateEnd } })
      .lean()
      .exec()
  );
  promises.push(
    Thankfulness.find({ user: uid, date: { $gte: dateStart, $lt: dateEnd } })
      .lean()
      .exec()
  );
  promises.push(Todo.find({ user: uid }).lean().exec());
  promises.push(
    TeachingNotes.find({ user: uid, date: { $gte: dateStart, $lt: dateEnd } })
      .lean()
      .exec()
  );
  // promises.push(
  //   Prayer.find({ user: uid, date: { $gte: dateStart, $lt: dateEnd }, isLongForm: true })
  //     .lean()
  //     .exec()
  // );
  promises.push(
    Prayer.find({ user: uid })
      .lean()
      .exec()
  );
  promises.push(
    User.findById(uid).select("subscriptionStatus")
      .lean()
      .exec()
  )

  Promise.all(promises)
    .then((results) => {
      
      // let todoPrayers = results[6].filter(prayer => prayer.isLongForm === false)
      // let todaysPrayer = results[6].filter(prayer => {
      //   console.log(prayer.date.toDateString())
      //   prayer.isLongForm === true && prayer.date.toDateString() === dateStart.toDateString() 
      // }) 
      // let prayers = todoPrayers + todaysPrayer
      // console.log(results[7])
      // var prayers = results[6]
      // prayers.concat(results[7])
      let resultsObject = {
        bibleStudy: results[0],
        dailyRoutine: results[1],
        journal: results[2],
        thankfulness: results[3],
        todo: results[4],
        teachingNotes: results[5],
        prayer: results[6],
        user: results[7]
      };
      return res.status(200).send(resultsObject);
    })
    .catch((err) => {
      return res.status(400).send({ message: "error", err: err });
      //handle error here
    });
};

