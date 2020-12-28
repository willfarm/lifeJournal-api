module.exports = (app) => {
  const bibleStudy = require("../controllers/bibleStudy.controller");
  // Create a new Journal
  app.post("/bibleStudy", bibleStudy.create);

  //get all Bible Study for user
  app.get("/bibleStudy/:uid", bibleStudy.getBibleStudy);

   //update bible study
   app.post("/bibleStudy/:bibleStudyId", bibleStudy.updateBibleStudy);
};
