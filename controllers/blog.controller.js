const Blog = require("../models/blog.model.js");
const Group = require("../models/group.model");

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

  exports.getBlogsWithGroup = (req, res) => {
    let groupCode = req.params.groupCode
    var groupContent
    Group.findOne({groupCode: groupCode}, (err, group) => {
      if (err) {
        res.json(err)
      }
      if (group) {
        groupContent = { "title" : group.groupName,
                          "contentUrl" : group.contentUrl}
      }
    }).then( () => {
      Blog.find()
      .then((blogs) => {
        if (!blogs) {
          return res.status(400).send({
            message: "No Blogs Found",
          });
        }
        if (groupContent) {
          blogs.push(groupContent)
        }
        console.log(blogs)
        return res.status(200).send(blogs);
      })
    }).catch((err) => {
      console.log(err);
      return res.status(400).send({
        message: err,
      });
    });
    
  }