var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');

// POST /comments - take what is in comments/newcomment and add to DB
router.post('/', function(req, res) {
  db.comment.create({
    name: "name",
    content: "content",
    postId: req.body.postId
  })
  .then(function(comment) {
    res.redirect('/posts/'+ req.params.postId);
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// router.post('/', function(req, res) {
//   db.post.create({
//     title: req.body.title,
//     content: req.body.content,
//     authorId: req.body.authorId
//   })
//   .then(function(post) {
//     res.redirect('/');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

// GET /posts/:id - display form for creating new comment //NEXT: posts/show
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('comments/newcomment', { authors: authors });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});
//
// router.get('/new', function(req, res) {
//   db.author.findAll()
//   .then(function(authors) {
//     res.render('posts/new', { authors: authors });
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

// GET /posts/:id - display form for seeing comments is in controllers/posts.js (on bottom)



module.exports = router;
