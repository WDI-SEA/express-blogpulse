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

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

//POST /comment - create a new comment
router.post('/:id/comments', function(req, res){
  var postId = req.params.id;
  var commentName = req.body.name;
  var commentContent = req.body.content;
  db.comment.create({
    name: req.body.name,
    content: req.body.content
  }).then(function(comment){
    db.post.find({
      where: {id: postId}
    }).then(function(post){
      post.addComment(comment);
    });
    res.redirect('/posts/'+commentId);
  });
});

module.exports = router;
