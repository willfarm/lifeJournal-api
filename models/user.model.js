const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const teachingNotesModel = require("./teachingNotes.model");
const SALT_WORK_FACTOR = 10;

const Journal = require("./journal.model").schema;
const Thankfulness = require("./thankfulness.model").schema;
const BibleStudy = require("./bibleStudy.model").schema;
const DailyRoutine = require("./dailyRoutine.model").schema;
const Prayer = require("./prayer.model").schema;
const TeachingNotes = require("./teachingNotes.model").schema;

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  appleId: {
    type: String,
    required: false,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  journals: [Journal],
  thankfulness: [Thankfulness],
  bibleStudy: [BibleStudy],
  dailyRoutine: [DailyRoutine],
  prayer: [Prayer],
  teachingNotes: [TeachingNotes],
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
// https://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("User", UserSchema);
