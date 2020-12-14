module.exports = (app) => {
  const bibleStudy = require("../controllers/bibleStudy.controller");
  // Create a new Journal
  app.post("/bibleStudy", bibleStudy.create);

  //get all Bible Study for user
  app.get("/bibleStudy/:uid", bibleStudy.getBibleStudy);

  // // Retrieve a single journal with journalId
  // app.get("/journal/:userId", journal.getAllJournalsForUser);

  // // Update a journal with journalId
  // app.put("/journal/:journalId", journal.update);

  // // Delete a journal with journalId
  // app.delete("/journal/:journalId", journal.delete);
};
