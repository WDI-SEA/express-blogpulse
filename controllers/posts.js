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
    // add comment table
    include: [db.author, db.comment]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

router.post('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  if(req.body.name.length <= 2) {
    res.send("Error, you need to have a longer name.");
  } else if(req.body.content < 6) {
    res.send("Error, please write a longer coment");
  } else {
    db.post.findOne({
      where:{id: req.params.id}
    }).then(function(post) {
      if(post) {
        post.createComment({
          name: req.body.name,
          content: req.body.content
        }).then(function(comment) {
          if(comment) {
            // res.send("redirect broken")
            res.redirect("./" + id);
          } else {
            res.send("An error has occured while you were creating a comment");
          }
        });
      } else {
        res.send("couldn't find teh post you were trying to comment on.")
      }
    });
  }
});

module.exports = router;
