module.exports = (app) => {
  const user = require("../controllers/user.controller");

  // Create a new user
  app.post("/user", user.create);

  // Retrieve all user
  app.get("/user", user.findAll);

  // Retrieve a single user with userId
  app.get("/user/:userId", user.findOne);

  //user login
  app.post("/user/auth", user.auth);

  // Update a user with userId
  app.put("/user/:userId", user.update);

  // Delete a user with userId
  app.delete("/user/:userId", user.delete);

  // Forgot Password
  app.post("/forgot-password", user.forgot);

  // Reset Password
  app.post("/reset/:id", user.reset);
};
