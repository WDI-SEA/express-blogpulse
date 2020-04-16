var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /comments - create a new comment
router.post('/articles', function(req, res) {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: req.body.articleId
      })
      .then(function(comment) {
        
        res.redirect('/articles/' + req.body.articleId)
      })
      .catch((err) => {
          console.log(err)
          res.send('This is an error')
      })
})



// GET /articles/:id - display a specific post and its author
router.get('/articles/:id', function(req, res) {
    db.article.findOne({
        where: { id: 1 },
        include: [db.comment]
      }).then(function(article) {
        // by using eager loading, the article model should have a comments key
        console.log(article.comments)
      })
})

module.exports = router