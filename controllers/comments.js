var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /comment - create a new comment post
router.post('/', function(req, res) {
	console.log(req.body)
	db.comment.create({
	  name: req.body.name,
	  content: req.body.content,
	  articleId: req.body.articleId
	})
	.then(function(post) {
	  res.redirect('/articles/' + parseInt(req.body.articleId))
	})
	.catch(function(error) {
	  res.status(400).render('main/404')
	})
  })

  // GET /articles/:id - display all comments for a specific post and its author
// router.get('/:id', function(req, res) {
// 	db.comment.findAll({
// 	  where: { articleId: req.params.id },
// 	  include: [db.comment]
// 	})
// 	.then(function(comments) {
// 	  if (!comments)
// 	  console.log('No Comments')
// 	  res.render('articles/show', { comments: comments })
// 	})
// 	.catch(function(error) {
// 	  console.log(error)
// 	  res.status(400).render('main/404')
// 	})
//   })





  module.exports = router