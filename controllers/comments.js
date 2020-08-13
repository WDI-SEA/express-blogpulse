let express = require('express')
let db = require('../models')
let router = express.Router()


router.post('/', (req, res) => {
    console.log('💃🏻',req.body)
    db.comment.create(req.body)
    .then((comment) => {

    console.log('/articles/'+req.body.articleId)
      res.redirect(`/articles/${req.body.articleId}`)
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

  module.exports = router
