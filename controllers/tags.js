var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

//TODO:

//Define some routes

// Get all tags

router.get('/', function(req, res) {
  db.tag.findAll().then(function(tags) {
    res.render('tags/allTags', {tags: tags});
  });
});


// Get particuler/single tag (by id)

router.get('/:id', function(req, res) {
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(tag) {
    res.render('tags/show', {tag: tag});
  });
});

// Edit a particular tag (by id)

//Delete a particular tag
router.delete('/:id', function(req, res) {
  console.log('DELETE ROUTEEEEEEEE');
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(tag) {
    //loop through and delete entries in join table
    async.forEach(tag.posts, function(p, callback) {
      //iterator function
      tag.removePost(p);
      callback();
    }, function() {
      //function that executes when al callbacks have returned
      tag.destroy({
        where: {id:req.params.id}
      }).then(function(deletedTag) {
        res.send('all good');
      });
    }) //End of async call
  }); //End of then promise
}); //end of router.delete

module.exports = router;
