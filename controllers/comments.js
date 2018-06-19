var express = require('express');
var db = require('../models');
var router = express.Router();

// POST comment on specific article
router.post('/', function(req, res) {
	db.post.findById(req.body.postId).then(function(post) {
		post.createComment({
			name: req.body.name,
			content: req.body.content
		}).then(function(comment) {
			res.redirect('/posts/' + req.body.postId);
		})
	});
});

module.exports = router;