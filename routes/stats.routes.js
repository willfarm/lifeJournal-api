module.exports = (app) => {
    const stats = require("../controllers/stats.controller");
    
  
    //get all blogs
    app.get("/stats", stats.getStats);
  
  };
  