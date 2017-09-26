var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/:id', function(req, res) {
  db.tag.find({
    where: {id: req.params.id}
  }).then(function(tag) {
    tag.getPosts().then(function(posts) {
      res.render('tags/show', {posts: posts, tag:tag})
    });
  });
});






module.exports = router;
