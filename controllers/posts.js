var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    db.tag.findOrCreate({
      where: {name: req.body.tag}
    }).spread(function(tag, created) {
      post.addTag(tag).then(function() {
        console.log("yippee");
      })
    })
    res.redirect('/');
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


// GET /posts/:id - display a specific post and its author
router.post('/:id/comments', function(req, res) {
  console.log("POST ROUTE TO /posts/ID/comments");
  db.post.findOne({
    where: { id: req.params.id }
  })
  .then(function(post) {
    console.log("NOW IN THEN - FOUND POST");
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function() {
      console.log("NOW IN THEN - CREATED COMMENT");
      res.redirect('/posts/' + req.params.id);
    })
  })
  .catch(function(error) {
    console.log("CATCH ERROR");
    res.status(400).render('main/404');
  });
});

// GET for /posts/tag - returns all posts with a given tag
router.get('/tags/:tag', function(req, res) {
  console.log("Im in the tag get");
  db.tag.findOne({
    where: {name: req.params.tag}
  }).then(function(tag) {
    tag.getPosts().then(function(posts) {
      console.log("These posts are tagged with " + tag.name + ":");
      res.render('posts/index', {posts: posts});
    })
  })
})

module.exports = router;
