var express = require('express')
var db = require('../models')
var router = express.Router()

// router.get('/new', function(req, res) {
//   res.render('comments/new')
// })

// router.post('/', function(req,res) {
// 	db.comment.create({
//     name: req.body.name,
//     content: req.body.content,
//     articleId: req.body.articleId
//   })
//   .then(function(post) {
//     res.redirect('/')
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404')
//   })
// })



module.exports = router