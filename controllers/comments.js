var express = require('express');
var db = require('../models');
var router = express.Router();

// POST comment on specific article
router.post('/:id', function(req,res) {
  db.post.find({
    where: {id: req.body.postId }
  }).then(function(post) {
    post.createComment({
      name: req.body.name,
      content:req.body.content
    }).then(function(comment) {
      res.redirect('/posts/' + req.params.id);
    })
  })
})

module.exports = router;