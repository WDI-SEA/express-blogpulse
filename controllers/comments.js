var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - adds a new comment
router.post('/', function(req, res) {
  db.post.findById(req.body.postId).then(function(post) {
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function(comment) {
      console.log(comment);
      res.redirect('/posts/' + req.body.postId);
    });
  });
});

module.exports = router;


// make tages to assign to categories
