module.exports = (app) => {
    const group = require("../controllers/group.controller");
    // Create a new blog
    app.post("/group/create", group.createGroup);
  
    //get all blogs
    // app.get("/groups", group.getGroups);
  
  };
  