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
  let date = req.body.date;

  console.log(req.body);

  var promises = [];
  promises.push(BibleStudy.find({ user: uid, date: date }).lean().exec());
  promises.push(DailyRoutine.find({ user: uid, date: date }).lean().exec());
  promises.push(Journal.find({ user: uid, date: date }).lean().exec());
  promises.push(Thankfulness.find({ user: uid, date: date }).lean().exec());
  promises.push(Todo.find({ user: uid, date: date }).lean().exec());
  promises.push(TeachingNotes.find({ user: uid, date: date }).lean().exec());
  promises.push(Prayer.find({ user: uid, date: date }).lean().exec());

  Promise.all(promises)
    .then((results) => {
      let resultsObject = {
        bibleStudy: results[0],
        dailyRoutine: results[1],
        journal: results[2],
        thankfulness: results[3],
        todo: results[4],
        teachingNotes: results[5],
        prayer: results[6],
      };
      console.log(resultsObject);
      // results[0] will have docs of first query
      // results[1] will have docs of second query
      // and so on...
      // you can combine all the results here and send back in response
    })
    .catch((err) => {
      //handle error here
    });
};
