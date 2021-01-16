const Blog = require("../models/blog.model.js");

exports.getBlogs = (req, res) => {
    Blog.find()
      .then((blogs) => {
        if (!blogs) {
          return res.status(400).send({
            message: "No BibleStudys Found",
          });
        }
        return res.status(200).send(blogs);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send({
          message: err,
        });
      });
  };

  exports.createBlog = (req, res) => {
    var blog = new Blog(req.body)
    blog.save().then((data) => {
        res.status(200).send(data)
    }).catch(err => res.status(400).send(err))
  }