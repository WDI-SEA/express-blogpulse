var express = require('express');
var db = require('../models');
var router = express.Router();
var marked = require('marked');

// POST /posts - create a new post
router.post('/', function(req, res) {
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
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
    include: [db.author, db.comment]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post, marked: marked });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// POST /comments - create a new comment
router.post('/:id/comments', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.params.id
  })
  .then(function(comment) {
    // req.params.id can be used in up&then function
    // res.redirect('/posts/' + req.params.id);
    res.redirect('/posts/' + comment.postId);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// edit post
router.get('/edit/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/edit', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.post('/edit/:id', function(req, res) {
  db.post.findById(req.params.id).then(function(post) {
    if (!post) throw Error();
    post.update(req.body);
    res.redirect('/posts/' + req.params.id);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});
module.exports = router;
