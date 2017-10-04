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
      where: {name: req.body.tag}
    }).spread(function(tag, created) {
      post.addTag(tag).then(function(foo) {
        // console.log("I'm in the shower!! Get out of my " + foo); "FOO" reads as [object SequelizeInstance:postsTags]??
      })
    })
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
    res.render('posts/show', { post: post });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// post a new comment to teh database and redirect to the show.ejs page
// router.post('/:id/comments', function(req, res) {
//     db.comment.create({
//         name: req.body.name,
//         content: req.body.content,
//         postId: req.params.id
//     }).then(function(post) {
//       res.redirect('/posts/' +req.params.id);
//       // res.redirect('posts/show', {comment: content}); //redirect isn't working??
//     });
// });


//Test function from class
//gets and individual post and all the comments that are linked to it, 
//creates and posts the comment to the database, 
//redirects to the comment page for that particular post
router.post('/:id/comments', function(req, res) {
  db.post.findOne({
    where: {id: req.params.id}
  }).then(function(post){
    post.createComment({
      name: req.body.name,
      content: req.body.content
    }).then(function() {
      res.redirect('posts/' + req.params.id)
    })
  }).catch(function(error) {
    res.status(400).rendder('main/404');
  });
});


//get router for the post/tag
//returns all posts with a given tag
router.get('/tags/:tag', function (req, res) {
  db.tag.findOne({  //this is searching for a specific tag by name
    where: {name: req.params.tag}
  }).then(function(tag) {
    tag.getPosts().then(function(posts) {
      // console.log("These posts are tagged with " + tag.name + ":");
      res.render('posts/index', {posts:posts});
    })
  })
})













module.exports = router;
