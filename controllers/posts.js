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
    db.tag.findOrCreate({
      where:{name: req.body.tag}
    }).spread(function(tag, created){
        post.addTag(tag).then(function(tag){
          console.log(tag);
      });
    });
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
    include: [db.author, db.comment, db.tag]
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('posts/show', { post: post});
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});


router.post('/:id/comments', function(req, res){
  var postId = req.params.id;
  db.comment.create({
    name: req.body.name,
    content: req.body.content
  }).then(function(comment){
    db.post.find({
      where: {id: postId}
    }).then(function(post){
      //.addComment from sequelize https://stackoverflow.com/questions/18828218/sequelize-add-association
      //https://sequelize.readthedocs.io/en/v3/docs/associations/
      post.addComment(comment);
    });
    res.redirect('/posts/'+postId);
  });
});

module.exports = router;
