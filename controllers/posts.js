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

//POST /handles the new comments
router.post("/:id/comments", function(req, res){
    db.comment.create({
        content: req.body.comment,
        name: req.body.name
    })
      .then(function(comment){
        res.redirect("/:id");
      })
})

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
  console.log("made it here");
  db.post.find({
    where: { id: req.params.id },
    include: [db.author]
  })
  .then(function(post){
      console.log("made it here");
      if (!post) throw Error();
      post.getComments({
        where: {id: req.params.id}
      }).then(function(comment){
          console.log(comment);
          res.render('posts/show', {
              post: post,
              comment: comment
          });
      })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
