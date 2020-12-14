module.exports = (app) => {
  const journal = require("../controllers/teachingNotes.controller");
  // Create a new Journal
  app.post("/teachingNotes", teachingNotes.create);

  //get all teachingNotes for user
  app.get("/teachingNotes/:uid", teachingNotes.getTeachingNotes);

  // // Retrieve a single journal with journalId
  // app.get("/journal/:userId", journal.getAllJournalsForUser);

  // // Update a journal with journalId
  // app.put("/journal/:journalId", journal.update);

  // // Delete a journal with journalId
  // app.delete("/journal/:journalId", journal.delete);
};
