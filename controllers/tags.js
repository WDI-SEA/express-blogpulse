var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

//TO DO: define some routes

//GET all tags
router.get('/', function(req, res) {
  db.tag.findAll().then(function(tags) {
    res.render('tags/allTags', {tags: tags});
  });
});
//GET particular tag (by id)
router.get('/:id', function(req, res) {
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(tag) {
    res.render('tags/show', {tag: tag});
  });
});

// Get the edit form
router.get('/:id/edit', function(req, res) {
  db.tag.findById(req.params.id).then(function(tag) {
    res.render('tags/edit', {tag: tag});
  });
});

//Edit a particular tag (by id)
router.put('/:id', function(req, res) {
  db.tag.update({
    name: req.body.name
  }, {
    fields: ['name'],
    where: {id: req.params.id}
  }).then(function(tag) {
    res.send("success!");
  });
});
//Delete a particular tag (by id)
router.delete('/:id', function(req, res) {
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(tag) {
    // loop through and delete entries in join table
    async.forEach(tag.posts, function(p, callback) {
      // iterator function
      tag.removePost(p);
      callback();
    }, function() {
      // function that executes when all callbacks have returned
      db.tag.destroy({
        where: {id: req.params.id}
      }).then(function(deletedTag) {
        res.send('All good');
      });
    }); // end of async call
  }); // end of then promise
});  // end of router.delete

module.exports = router;
