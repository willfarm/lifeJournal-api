module.exports = (app) => {
    const blog = require("../controllers/blog.controller");
    // Create a new blog
    app.post("/blog/create", blog.createBlog);
  
    //get all blogs
    app.get("/blog", blog.getBlogs);
  
  };
  