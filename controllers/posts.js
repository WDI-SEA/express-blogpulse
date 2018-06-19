var express = require('express');
var db = require('../models');
var router = express.Router();

// GET / - display all posts and their authors
router.get('/', function (req, res) {
  db.post.findAll({
    include: [db.author]
  }).then(function (posts) {
    res.render('posts/index', { posts: posts });
  }).catch(function (error) {
    res.status(400).render('main/404');
  });
});

// POST /posts - create a new post
router.post('/', function (req, res) {
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  }).then(function (post) {
    db.tag.findOrCreate({
      where: { name: req.body.tagName }
    }).spread(function (tag, created) {
      post.addTag(tag).then(function (tag) {
        console.log(tag + 'added to ' + post);
        res.redirect('/');
      });
    });
  }).catch(function (error) {
    console.log(error)
    res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function (req, res) {
  db.author.findAll().then(function (authors) {
    res.render('posts/new', { authors: authors });
  }).catch(function (error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/:id/edit - display form for editing a post
router.get('/:id/edit', function (req, res) {
  db.post.find({
    where: { id: req.params.id }
  }).then(function (data) {
    res.render('posts/edit', { post: data });
  });
})

// PUT /posts/:id - updates post 
router.put('/:id', function (req, res) {
  db.post.update({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  }, {
      where: { id: req.params.id }
    }).then(function (data) {
      console.log(data);
      res.sendStatus(200);
    });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function (req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author, db.comment, db.tag]
  }).then(function (post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  }).catch(function (error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

// POST /posts/:id - submit a comment on a specific post
router.post('/:id/comments', function (req, res) {
  // Display form for creating a comment
  db.post.findOne({
    where: { id: req.params.id }
  }).then(function (post) {
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function () {
      res.redirect('/posts/' + req.params.id);
    });
  }).catch(function (error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

module.exports = router;
