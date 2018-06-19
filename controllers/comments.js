var express = require('express');
var db = require('../models');
var router = express.Router();


router.post('/', function(req, res) {
  db.comment.create({
    name: req.body.name,
    content: req.body.content
    postId: req.params.id
  }).then(function(comment) {
      res.redirect('/');
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
  });

router.get('/:id', function(req, res) {
  db.comment.find({
    where: { id: req.params.id },
    include: [db.comment]
  }).then(function(post) {
    if (!post) throw Error();
      res.render('comments/show', { comment: comment });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
  });


//   // by using eager loading, the post model should have a comments key
//   console.log(post.comments);
// });
