var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('success');
});

router.post('/new', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.body.id
  }).then(function(comment) {
    console.log(comment);
    res.redirect('../posts/' + comment.postId);
  });
});

module.exports = router;
