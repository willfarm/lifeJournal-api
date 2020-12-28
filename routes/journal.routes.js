module.exports = (app) => {
    const journal = require("../controllers/journal.controller");
    // Create a new Journal
    app.post("/journal", journal.create);

    //get all journals for user
    app.get("/journal/:uid", journal.getJournals)

    //update Todo
    app.post("/journal/:journalId", journal.updateJournal);

  };
  