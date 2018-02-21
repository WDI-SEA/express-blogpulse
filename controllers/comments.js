var express = require('express');
var db = require('../models');
var router = express.Router();

router.post('/', function(req, res) {
  var name = req.body.name;
  var content = req.body.content;
  var postId = req.body.postid;
  db.comment.create({
    name: name,
    content: content,
    postId: postId
  }).then(function() {
    console.log("BULLSHIT");
    res.redirect('/posts/'+postId+'');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});


module.exports = router;
