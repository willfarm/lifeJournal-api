module.exports = (app) => {
  const iap = require("../models/helpers/iap.helper");
  // Create a new subscription
  app.post("/new-subscription", iap.newSubscription);
};
