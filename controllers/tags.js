var express = require('express');
var db = require('../models');
var router = express.Router();

 // GET /tags - gets all tags
router.get('/', function(req, res) {
  db.tag.findAll().then(function(data) {
    res.render('tags/index', {tags: data});
  });
});

router.get('/:id', function(req, res) {
  db.tag.findById(req.params.id).then(function(tag) {
    tag.getPosts().then(function(posts) {
      res.render('tags/show', {tag: tag, posts: posts});
    });
  });
});

// GET /tags/new -returns the form for adding
router.get('/new', function(req, res) {
  res.render('tags/new');
});
router.post('/', function(req, res) {
  db.tag.create({
    name: req.body.name
  }).then(function(tag){
    console.log(tag);
    res.redirect('/tags');
  })
});

module.exports = router;
