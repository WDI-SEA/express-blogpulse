var express = require('express')
var db = require('../models')
var router = express.Router()


router.post('/', (req, res) => {
    console.log(req.body)
    db.comment.create({
        name: req.body.name,
        comment: req.body.comment,
        articleId: req.body.articleId
    })
    .then(function(post) {
        res.redirect('/articles/' + req.body.articleId)
      })
      .catch(function(error) {
        res.status(400).render('main/404')
      })
    })

  module.exports = router