const teachingNotesModel = require("../models/teachingNotes.model");

module.exports = (app) => {
  const teachingNotes = require("../controllers/teachingNotes.controller");
  // Create a new TeachingNotes
  app.post("/teachingNotes", teachingNotes.create);

  //get all teachingNotes for user
  app.get("/teachingNotes/:uid", teachingNotes.getTeachingNotes);

   //update Teaching notes
   app.post("/teachingNotes/:teachingNotesId", teachingNotes.updateTeachingNotes)
};
