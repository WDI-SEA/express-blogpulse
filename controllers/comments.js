var express = require('express');
var db = require('../models');
var router = express.Router();

//Post /comments - adds a new comment
router.post('/', function(req, res){
  console.log("this is the postId: ", req.body.postId);
  db.post.findById(req.body.postId).then(function(post){
    console.log(post);
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function(comment){
      console.log(comment);
      res.redirect("/posts/"+ req.body.postId);
    })
  });
});

module.exports = router;
