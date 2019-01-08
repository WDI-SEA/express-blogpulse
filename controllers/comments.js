var express = require('express');
var db = require('../models');
var router = express.Router();

// create comments
router.post('/', function(req, res) {
	db.post.findById(req.body.postId).then(function(post) {
	  // by using eager loading, the post model should have a comments key
	  console.log('found post with id', post.id);
	  post.createComment({
	  	name: req.body.name,
	  	content: req.body.content
	  }).then(function(createdComment){
	  	res.redirect('/posts/' + post.id)
	  })
	}).catch(function(err){
		console.log(err);
	});
});

module.exports = router;