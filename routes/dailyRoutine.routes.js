module.exports = (app) => {
  const dailyRoutine = require("../controllers/dailyRoutine.controller");
  // Create a new Journal
  app.post("/dailyRoutine", dailyRoutine.create);

  //get all Bible Study for user
  app.get("/dailyRoutine/:uid", dailyRoutine.getDailyRoutine);

  //update a daily routine
  app.post("/dailyRoutine/update", dailyRoutine.updateDailyRoutine);
};
