var express = require('express')
var db = require('../models')
var router = express.Router()


router.post('/articles', function(req, res) {
db.user.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
  })
  .then(function(comment) {
    console.log(comment.get())
    res.redirect('/articles/' + req.body.articleId)
  })
  .catch((err) => {
      console.log(err)
      res.send('this is broken')
  })
})


// router.get('/:id', function(req, res) {
//   db.user.findOne({
//     where: { id: req.params.id },
//     include: [db.article]
//   })
//   .then(function(user) {
//     res.render('articles/show', { user: user })
//   })
//   .catch(function(error) {
//     console.log(error)
//     res.status(400).render('main/404')
//   })
// })


    module.exports = router