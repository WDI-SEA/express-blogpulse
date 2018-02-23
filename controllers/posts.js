var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  // change comma-separated tags into an array of tags
  var tags = [];
  if(req.body.tags) {
    tags = req.body.tags.split(',');
  }

  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    // handle adding tags if there are any
    if(tags.length > 0) {
      // add some tags
      // make a loop through the tag array
      async.forEach(tags, function(t, callback) {
        // this is the iterator function
        // add the tag to the tags table
        db.tag.findOrCreate({
          where: {name: t.trim()}
        }).spread(function(newTag, wasCreated) {
          // add the relationship between the post and the tag in the posts_tags table
          post.addTag(newTag).then(function(){
            callback(); //this says that it's done
          });
        });
      }, function() {
        // this is the function that runs when everything is resolved/done
        // redirect to post page
        res.redirect('/posts/' + post.id);
      });
    }
    else {
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

router.post('/:id/comments', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.body.postId
  }).then(function(comment) {
    res.redirect('/posts/' + req.params.id);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
