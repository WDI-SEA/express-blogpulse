var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts/comments - add a new comment to a post
router.post('/:id', function(req, res) {
   // find the current post
  db.post.findById(req.params.id).then(function(post) {
    // create a comment specifically for that author
    post.createComment({
      name: req.body.name,
      content: req.body.content,
      postId: post.id
    }).then(function(post) {
      res.redirect('/posts/' + post.postId);
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
  });
});

module.exports = router;