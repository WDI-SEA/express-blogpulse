var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comment - create a new comment
// router.comment('/new', function(req, res) {
//   db.comment.create({
//     name: req.body.name,
//     content: req.body.content,
//     postId: req.body.postId
//   })
//   .then(function(comment) {
//     res.redirect('/posts/show');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

// GET /comments/new - display form for creating new comments
router.get('/new', function(req, res) {
  db.comment.findAll()
  .then(function(comments) {
    res.render('comments/new', { posts: posts });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /comment/:id - display a specific comment and its post
router.get('/:id', function(req, res) {
  db.comment.find({
    where: { id: req.params.id },
    include: [db.post]
  })
  .then(function(comment) {
    if (!comment) throw Error();
    res.render('comment/show', { comment: comment });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
