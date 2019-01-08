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

// GET /posts/:id - display a specific post, its author + comments
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

router.post('/add', function(req,res) {
  //res.send(req.body.content);
  db.comment.findOrCreate({
    where: { content: req.body.content },
    defaults: { name: req.body.name, content: req.body.content, postId: req.body.postId }
  }).spread(function(comment, created) {
    res.redirect(`/posts/${req.body.postId}`);

  });
  console.log('posting a comment to the database', req.body);
});


module.exports = router;
