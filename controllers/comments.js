var express = require('express');
var db = require('../models');
var router = express.Router();





router.get("/:id", function(req, res){
  db.comments.findAll({ 
    include: [db.comments] }).then(function(comment){
    res.render("show", {comment: comment});
  }); //getting all the authors, and then getting their articles (like a join). now we can access them like an object, access articles as a property of authors (authors.articles, etc)
});




// POST /comments - create a new post
router.comment('/', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    postId: req.body.postId
  })
  .then(function(comment) {
  console.log(comment.get());
  });
});

// // GET /posts/new - display form for creating new posts
// router.get('/new', function(req, res) {
//   db.author.findAll()
//   .then(function(authors) {
//     res.render('posts/new', { authors: authors });
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

// GET /comments/:id
router.get('/:id', function(req, res) {
  db.post.find({
    where: { id: req.params.id },
    include: [db.comment]
  })
  .then(function(comment) {
  console.log(comment.get());
  });
});



module.exports = router;





//   db.comment.create({
//     name: 'Paul Allen',
//     content: 'This is really neat! Thanks for posting.',
//     postId: 1
//   }).then(function(comment) {
//     console.log(comment.get());
//   });

// // // GET /posts/new - display form for creating new posts
// // router.get('/new', function(req, res) {
// //   db.author.findAll()
// //   .then(function(authors) {
// //     res.render('posts/new', { authors: authors });
// //   })
// //   .catch(function(error) {
// //     res.status(400).render('main/404');
// //   });
// // });


//   db.post.find({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(post) {
//     // by using eager loading, the post model should have a comments key
//     console.log(post.comments);
//   });

