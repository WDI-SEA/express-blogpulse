var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - create a new comment
router.post('/', function(req, res) {
  console.log("adding new comment");
  console.log(req.body);
  db.comment.create({
    name: req.body.name,
    contentOfTheComment: req.body.contentOfTheComment,
    postId: req.body.postId
  })
  .then(function(comment) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /comments/:id - display a specific post and its
router.get('/:postId', function(req, res) {
  console.log("getting comments for post");
  db.comment.findAll({
    where: { postId: req.params.postId },
  }).then(function(comments) {
    if (!comments) throw Error();

    console.log(comments);
    res.render('comments/showcomments', { comments: comments, postId: req.params.postId });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/new/:postId', function(req, res) {
  console.log("generating new comment page");
  db.post.findOne({
    where: { id: req.params.postId }
  }).then(function(post){
    res.render('comments/newComment', { postId: req.params.postId, postTitle: post.title });
  });
});


module.exports = router;
