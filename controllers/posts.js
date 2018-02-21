var express = require('express');
var db = require('../models');
var router = express.Router();

router.use(express.static(__dirname + '/public/'));

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

//post comments to THIS post id
router.post('/:id', function(req,res) { //creating a new comment
  db.post.find({
    where: { id: req.body.postId } //find the associated post by id number
  }).then(function(post) { //using that author, add THIS post to THIS author in the author database
    //format =  table.createModel()
      post.createComment({
      name: req.body.name, //loading data from our form input fields
      content: req.body.content //loading data from our form input fields
    }).then(function(comment) { //load child
      res.redirect('/posts/' + req.params.id); //send comment
    });
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

// GET /posts/:id - display a specific post and its author and its comments??
router.get('/:id', function(req, res) {
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

//DELETE comment
// router.delete('/:id', function(req, res) {
//   db.post.find({
//     where: { id: req.body.postId } //find the associated post by id number
//   }).then(function(post) { //using that author, add THIS post to THIS author in the author database
//     //format =  table.createModel()
//       post.comment.destroy({
//         where: {name: req.params.name}
//     }).then(function(comment) { //load child
//       res.redirect('/posts/' + req.params.id); //send comment
//     });
//   });
// });

module.exports = router;
