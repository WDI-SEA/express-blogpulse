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



////// comments //////



// POST /posts - create a new post
router.post('/', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.body.postId
  })
  .then(function(comment) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/new - display form for creating new posts
router.get('/:id/comment', function(req, res) {
  db.comment.findAll()
  .then(function(comment) {
    res.render('posts/comment', { comment: comment });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id/comment', function(req, res) {
  db.comment.find({
    where: { id: req.params.id },
    include: [db.post]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/comment', { comment: comment });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});




// router.get("/:id/comments", function(req, res){
//   db.post.findAll({
//     where: { id: req.params.id },
//     include: [db.comment]
//      }).then(function(post){
//   res.render("comment", { post: post}); //now we can use 'authors' in the loop
//   });
// });


// router.get("/:id", function(req, res){
//   db.post.find({ 
//     where: { id: req.params.id },
//     include: [db.comment] 
//   }).then(function(post){
//     // res.render('posts/show', {post: post});
//     console.log(post.comment);
//   }); //getting all the authors, and then getting their articles (like a join). now we can access them like an object, access articles as a property of authors (authors.articles, etc)
// });




// // POST /posts - create a new comment
// router.post('/', function(req, res) {
//   db.post.create({
//     name: req.body.name,
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

// // GET /posts/new - display form for creating comments
// router.get('/new', function(req, res) {
//   db.author.findAll()
//   .then(function(authors) {
//     res.render('posts/new', { authors: authors });
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });






module.exports = router;
