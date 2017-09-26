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
  console.log("in the get /posts/id");
  db.post.find({
    where: { id: req.params.id },
    include: [db.author,db.comment]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.post('/:id/comments', function(req, res) {
  db.post.find({
    where: { id: req.params.id }
  }).then(function(post) {
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function() {
      console.log("comment has been created");
      res.redirect('/post' + req.params.id);
    })
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});


// db.comment.create({
// name: 'Paul Allen',
// content: 'This is really neat! Thanks for posting.',
// postId: 1
// }).then(function(comment) {
// console.log(comment.get());
// })
// .then(function(post) {
//   console.log(post.comment);
// });

// db.post.find


// router.post('/:id')
//
//     console.log("comments");
//   where: {id: comment}
//   })
//   ///this is where step one goes
// });

module.exports = router;
