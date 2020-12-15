module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const day = require("../controllers/day.controller");

  // Create a new user
  app.post("/user", user.create);

  // Retrieve all user
  app.get("/user", user.findAll);

  // Retrieve a single user with userId
  app.get("/user/:userId", user.findOne);

  //user login
  app.post("/user/auth", user.auth);

  //user login / signup with Apple
  app.post("/user/authenticateWithApple", user.authenticateWithApple);

  // Update a user with userId
  app.put("/user/:userId", user.update);

  // Delete a user with userId
  app.delete("/user/:userId", user.delete);

  // Forgot Password
  app.post("/forgot-password", user.forgot);

  // Reset Password
  app.post("/reset/:id", user.reset);

  app.get("/day/:userId", day.getDayForUser);
};
