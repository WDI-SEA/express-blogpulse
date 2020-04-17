var express = require('express')
var db = require('../models')
var router = express.Router();

//Post //comments (creating a new post)

//display the comments but redirect it to the same page with comments added
router.post('/show', (req, res) => {
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      articleId: req.body.articleId
    })
    .then(function(comment) {
      console.log(comment.name)
      res.redirect('/articles/' + req.body.articleId)
    })
    .catch(function(error) {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
  
  //display the comments and redirect it to the same page 
  router.get('/articles', (req, res) => {
    db.comment.findAll()
    .then(comment => {
      res.redirect('article/show', {article: article, comment} )
    })
    .catch((err) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })

module.exports = router