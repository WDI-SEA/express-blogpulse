var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /tags - gets all tags
router.get('/', function (req, res) {
  db.tag.findAll().then(function (data) {
    res.render('tags/index', { tags: data });
  });
});

// GET /tags/new - returns the form for adding
router.get('/new', function (req, res) {
  res.render('tags/new');
});

// POST /tags - adds a new tag
router.post('/', function (req, res) {
  db.tag.create({
    name: req.body.name
  }).then(function (tag) {
    console.log(tag);
    res.redirect('/tags');
  });
});

// GET /tags/:id - returns a specific tag with its posts
router.get('/:id', function (req, res) {
  db.tag.findById(req.params.id).then(function (tag) {
    console.log(tag);
    tag.getPosts().then(function (posts) {
      res.render('tags/show', { tag: tag, posts: posts })
    });
  });
});

module.exports = router;
