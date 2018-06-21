var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
  //first, create a new post
  db.post.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  }).then(function(post) {
//then create/find a new tag
    db.tag.findOrCreate({
      where: {name: req.body.tagName}
    }).spread(function(tag, created) {
      //add that tag to the post from above.. //project.addCategory, instead of post.addTag...
      post.addTag(tag).then(function(tag) {
        console.log(tag + ' added to ' + post);
        res.redirect('/');
      });
    });
  }).catch(function(error) {
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
