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

// GET /posts/:id/edit - display edit post page
router.get('/:id/edit', function(req, res) {
  db.post.find({
    where: {id: req.params.id},
    include: [db.author]
  }).then(function(post) {
    res.render('posts/edit', {post: post})
  });
});

// PUT /posts/:id - update post
router.put('/:id', function(req, res) {
  console.log('PUT IT ON YA')
  db.post.update({
    title: req.body.title,
    content: req.body.content
  }, {
    where: {id: req.params.id}
  }).then(function(data) {
    res.send(data);
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
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
