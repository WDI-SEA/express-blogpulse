var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /authors - display all authors
router.get('/', function(req, res) {
  db.author.findAll()
        .then(function(authors) {
          res.render('authors/index', { authors: authors });
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });
});

// POST /authors - create a new author
router.post('/', function(req, res) {
  db.author.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio
  })
        .then(function(author) {
          res.redirect('/authors');
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });
});

router.post('/:id/:postId/edit', function(req, res) {
  db.author.findOne({
    where: {id:req.params.id}
  }).then(function(author) {
  author.getPosts({
    where: {id:req.params.postId}
  }).then(function(posts) {
    posts[0].update({
      title: req.body.title,
      content: req.body.content
    }).then(function(data) {
      var url = '/posts/' + req.params.postId;
      res.redirect(url);
    });
  });
});
});

// GET /authors/new - display form for creating a new author
router.get('/new', function(req, res) {
  res.render('authors/new');
});

// GET /authors/:id - display a specific author and their posts
router.get('/:id', function(req, res) {
  db.author.find({
    where: { id: req.params.id },
    include: [db.post]
  })
    .then(function(author) {
      if (!author) throw Error();
      res.render('authors/show', { author: author });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
});

router.get('/:id/:postId/edit', function(req, res) {
  db.author.find({
    where: { id: req.params.id },
    include: [{model: db.post, where:{id:req.params.postId}}]
  }).then(function(data) {
    console.log(data);
    res.render('authors/edit', {author:data});
  });
});


module.exports = router;
