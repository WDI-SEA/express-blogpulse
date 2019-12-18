var express = require('express')
var db = require('../models')
var router = express.Router()


router.post('/', (req, res) => {
    db.comment.create(req.body)
  .then(function(comment) {
    console.log(comment.get())
    res.redirect('/articles/' + req.body.articleId)
  })
})

module.exports = router