module.exports = (app) => {
    const journal = require("../controllers/journal.controller");
    // Create a new Journal
    app.post("/journal", journal.create);
  
    // // Retrieve a single journal with journalId
    // app.get("/journal/:userId", journal.getAllJournalsForUser);
  
    // // Update a journal with journalId
    // app.put("/journal/:journalId", journal.update);
  
    // // Delete a journal with journalId
    // app.delete("/journal/:journalId", journal.delete);

  };
  