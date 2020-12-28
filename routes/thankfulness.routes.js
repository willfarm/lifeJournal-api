module.exports = (app) => {
    const thankfulness = require("../controllers/thankfulness.controller");
    // Create a new Journal
    app.post("/thankfulness", thankfulness.create);

    //get all thankfulnesss for user
    app.get("/thankfulness/:uid", thankfulness.getThankfulness)

    //update thankfulness

    app.post("/thankfulness/:thankfulnessId", thankfulness.updateThankfulness)

  };
  