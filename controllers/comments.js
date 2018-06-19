var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - add a new comment to a post
router.post('/', function(req, res) {
   // find the current post
  db.post.findById(req.body.postId).then(function(post) {
    // create a comment specifically for that post
    post.createComment({
      name: req.body.name,
      content: req.body.content
      // don't need the postId column... it will add automatically
    }).then(function(post) {
      res.redirect('/posts/' + post.postId);
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
  });
});

router.delete('/:id', function(req, res) {
	console.log('comment to delete: ', req.params.id);
	db.comment.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
    res.sendStatus(200);
	});
});

module.exports = router;