module.exports = (app) => {
    const iap = require("../models/helpers/iap.helper");
    // Create a new Journal
    app.post("/new-subscription", iap.newSubscirption);
  };