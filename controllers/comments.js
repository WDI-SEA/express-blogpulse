var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - create a new comment for this post
router.post('/', function(req, res) {
  db.post.find({
    where: {id: req.body.postId}
  }).then(function(post) {
    post.createComment({
      name: req.body.name,
      content: req.body.content,
      postId: req.body.postId
    }).then(function(comment) {
      var postUrl = '/posts/'+ req.body.postId;
      res.redirect(postUrl);
    });
  });
});


module.exports = router;
