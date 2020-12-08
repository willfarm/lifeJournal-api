module.exports = (app) => {
    const prayer = require("../controllers/prayer.controller");
    // Create a new prayer
    app.post("/prayer", prayer.create);

    //get all prayer for user
    app.get("/prary/:uid", prayer.getPrayer)
  };
  