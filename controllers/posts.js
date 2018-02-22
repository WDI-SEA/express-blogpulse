var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async')


// POST /posts - create a new post
router.post('/', function(req, res) {
  //change my comma separated tags into an array of tags
  var tags = [];
  if(req.body.tags){  //only do somethig if tag was not empty
    tags = req.body.tags.split(',');
  }

  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    //handling adding the tags, if there are any
    if (tags.length > 0) {
      //add some tags
      //make a loop through the tag array
      //add the tag to the tag table
      async.forEach(tags, function(t, callback){  //t is for tag
        //this is the iterater function
        db.tag.findOrCreate({
          where: {name: t.trim()}
        }).spread(function(newTag, wasCreate) {
          //add the relationship between the post and tag in the posts_tags table
          post.addTag(newTag).then(function() {
            callback(); //this will tell us it is done--b/c async
          })
        })
      }, function(){
         //this is the function that runs when everything is resolved
         res.redirect('/post/' + post.id);
      })
     
      
      //redirect to post page
    } else {
      //no tags to add, just redirect to post page
    }

    res.redirect('/posts/' + post.id);
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
      }).then(function(data) {
        res.redirect('/posts/' + req.params.id);
      });
  });




module.exports = router;
