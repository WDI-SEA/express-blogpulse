var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.body.postId
  })
  .then(function(post) {
    res.redirect('/posts/' + req.body.postId);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
