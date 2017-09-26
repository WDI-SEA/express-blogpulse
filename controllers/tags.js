var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
  db.tag.findAll().then(function(tags) {
    res.render('tags/main', { tags: tags });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id', function(req, res){
  console.log(req.params.id);
  db.tag.find({
    where: {id: req.params.id},
  }).then(function(tag){
    tag.getPosts().then(function(posts){
        res.render('tags/show', {posts:posts});
    });
  });
});


module.exports = router;
