module.exports = (app) => {
    const thankfulness = require("../controllers/thankfulness.controller");
    // Create a new Journal
    app.post("/thankfulness", thankfulness.create);

    //get all thankfulnesss for user
    app.get("/thankfulness/:uid", thankfulness.getThankfulness)
  
    // // Retrieve a single thankfulness with thankfulnessId
    // app.get("/thankfulness/:userId", thankfulness.getAllJournalsForUser);
  
    // // Update a thankfulness with thankfulnessId
    // app.put("/thankfulness/:thankfulnessId", thankfulness.update);
  
    // // Delete a thankfulness with thankfulnessId
    // app.delete("/thankfulness/:thankfulnessId", thankfulness.delete);

  };
  