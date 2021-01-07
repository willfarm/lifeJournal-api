module.exports = (app) => {
  const dailyRoutine = require("../controllers/dailyRoutine.controller");
  // Create a new Journal
  app.post("/dailyRoutine", dailyRoutine.create);

  //get all Bible Study for user
  app.get("/dailyRoutine/:uid", dailyRoutine.getDailyRoutine);

  //update a daily routine
  app.post("/dailyRoutine/update", dailyRoutine.updateDailyRoutine);

  //update all routines to false
  app.get("/dailyRoutine/update-all/:uid", dailyRoutine.falseAllDailyRoutines);

  app.get('/dailyRoutine/delete/:routineId', dailyRoutine.deleteDailyRoutine)
};
