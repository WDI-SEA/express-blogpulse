var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// POST /posts - create a new post
router.post('/', function(req, res) {
  // change comma-separated list of tags into an array
  var tags = [];
  if(req.body.tags){
    tags = req.body.tags.split(',');
  }
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    // handle data clean up on tags, if present
    if(tags.length > 0){
      // this is a situation where you need to
      // add the tags
      // loop through the tag array
      // array
      async.forEach(tags, function(t, callback){
        // this is the iterator function
        // takes t for tags item
        // add the tag to the tag table
        db.tag.findOrCreate({
          where: {name:t.trim()}
        }).spread(function(newTag, wasCreated){
          // add the relationship between the post and tags
          // this is a shortcut helper function
          post.addTag(newTag).then(function(){
            // callback - this is done
            callback();
          });
        });
      }, function(){
        // redirect when complete
        res.redirect('/posts/' + post.id)
      });
    } else {
      // no tags to add
      res.redirect('/posts/' + post.id);
    }
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('posts/new', { authors: authors });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author, db.comment, db.tag]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
